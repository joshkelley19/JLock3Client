import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { Entry, SubjectData } from '../../model';
import { JLockConstants } from '../constants';
import { AuthorizationService } from '../authorization.service';

@Injectable()
export class EntryController {
    newEntry: Entry;
    selectedEntry: Entry;
    entries: Array<Entry>;
    getEntryFunctionId: number;
    addEntryFunctionId: number;
    deleteEntryFunctionId: number;
    entrySubject: Subject<Array<Entry>>;

    constructor(private http: Http, private auth: AuthorizationService) {
        this.initializeService();
    }

    getEntries(token: string): Observable<any> {
        let args: RequestOptionsArgs = this.auth.getArgs(token);
        console.log('get entries args', args);
        return this.http.get(JLockConstants.HOSTURL + '/entry/' + this.auth.user.id, args)
            .map((response: Response) => {
                return response.json();
            });
    }

    addEntries(token: string): Observable<Array<Entry>> {
        let args: RequestOptionsArgs = this.auth.getArgs(token);
        this.newEntry.clientAccountNumber = this.auth.user.id;
        // args.headers.append('Access-Control-Request-Headers','authorization');
        // args.body = this.newEntry;
        console.log('add entries args', args);
        // return this.http.post(JLockConstants.HOSTURL + '/entry/add', args)
        return this.http.post(JLockConstants.HOSTURL + '/entry/add', this.newEntry, args)
            .map((response: Response) => {
                return response.json();
            })
    }

    deleteEntry(token: string): Observable<Array<Entry>> {
        console.log('Deleting entry', this.selectedEntry);
        let args: RequestOptionsArgs = this.auth.getArgs(token);
        args.body = this.selectedEntry;
        return this.http.delete(JLockConstants.HOSTURL + '/entry/delete', args)
            .map((response: Response) => {
                return response.json();
            })
    }

    resetNewEntry() {
        console.log('resetting new entry');
        this.newEntry = <Entry>{};
    }

    resetSelectedEntry() {
        console.log('resetting selected entry');
        this.selectedEntry = <Entry>{};
    }

    processEntries(httpResponse) {
        this.entries = httpResponse;
        console.log('processing entries', this.entries);
    }

    getGetEntrySubject() {
        return this.entrySubject;
    }

    setGetEntrySubscription() {
        this.auth.getAuthSubject()
            .filter((data: SubjectData) => {
                switch (data.functionId) {
                    case this.getEntryFunctionId: return true;
                    case this.addEntryFunctionId: return true;
                    case this.deleteEntryFunctionId: return true;
                    default: return false;
                }
            })
            .subscribe((data: SubjectData) => {
                let requestObservable: Observable<any>;
                if (data.token !== null && data.token !== undefined) {
                    switch (data.functionId) {
                        case this.getEntryFunctionId: requestObservable = this.getEntries(data.token); console.log('DEBUG getting entries'); break;
                        case this.addEntryFunctionId: requestObservable = this.addEntries(data.token); console.log('DEBUG adding entries'); break;
                        case this.deleteEntryFunctionId: requestObservable = this.deleteEntry(data.token); console.log('DEBUG deleting entries'); break;
                    }
                    console.log('Request Observable set in switch = ', requestObservable)
                    requestObservable
                        .subscribe((entries: Array<Entry>) => {
                            console.log('sending to entries subject ', entries);
                            this.entrySubject.next(entries);
                        },
                        (error) => {
                            console.error('Error receiving entries', error);
                        })
                }
            });
    }

    initializeService() {
        this.resetNewEntry();
        this.resetSelectedEntry();
        this.entries = [];
        this.entrySubject = new Subject();
        this.getEntryFunctionId = this.auth.generateFunctionId();
        this.addEntryFunctionId = this.auth.generateFunctionId();
        this.deleteEntryFunctionId = this.auth.generateFunctionId();
        this.setGetEntrySubscription();
    }

}