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
    entrySubject: Subject<Array<Entry>>;

    constructor(private http: Http, private auth: AuthorizationService) {
        this.initializeService();
    }

    getEntries(): Observable<any> {
        let args: RequestOptionsArgs = this.auth.getArgs();
        console.log('get entries args', args);
        return this.http.get(JLockConstants.HOSTURL + '/entry/' + this.auth.user.id, args)
            .map((response: Response) => {
                return response.json();
            });
    }

    addEntries(): Observable<Array<Entry>> {
        let args: RequestOptionsArgs = this.auth.getArgs();
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

    deleteEntry(): Observable<Array<Entry>> {
        console.log('Deleting entry', this.selectedEntry);
        let args: RequestOptionsArgs = this.auth.getArgs();
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

    initializeService() {
        this.resetNewEntry();
        this.resetSelectedEntry();
        this.entries = [];
        this.entrySubject = new Subject<Array<Entry>>();

        this.auth.authResponseNotification
            .subscribe(response => {
                if (!response) {
                    this.entries = [];
                }
            });
    }

}