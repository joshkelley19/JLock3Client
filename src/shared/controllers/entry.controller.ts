import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Identity, Entry, User } from '../../model';
import { JLockConstants } from '../constants';

@Injectable()
export class EntryController {
    newEntry: Entry;
    entries: Array<Entry>;

    constructor(private http: Http) {
        this.entries = [];
    }

    getEntries(id: number, auth: Identity): Observable<any> {
        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(auth.userName + ':' + auth.password));
        let args: RequestOptionsArgs = {
            headers
        }
        console.log('Authorizing with', auth.userName, auth.password);
        return this.http.get(JLockConstants.HOSTURL + '/entry/' + id, args)
            .map(response => {
                return response.json();
            });
    }

    addEntries(userId: number): Observable<Array<Entry>> {
        this.newEntry.clientAccountNumber = userId;
        return this.http.post(JLockConstants.HOSTURL + '/entry/add', this.newEntry)
            .map((response) => {
                return response.json();
            })
    }

    deleteEntry(entry: Entry): Observable<Array<Entry>> {
        let request: RequestOptionsArgs = {
            body: entry
        }
        return this.http.delete(JLockConstants.HOSTURL + '/entry/delete', request)
            .map((response) => {
                return response.json();
            })
    }

    resetNewEntry() {
        console.log('resetting new entry');
        this.newEntry = <Entry>{};
    }

    processEntries(httpResponse) {
        this.entries = httpResponse;
        console.log('processing entries', this.entries);
    }

}