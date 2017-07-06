import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LoadingController, Loading } from 'ionic-angular';
import 'rxjs';

import { JLockConstants } from '../../shared/constants';
import { Entry } from '../../model/Entry';
import { User } from '../../model/User';

@Injectable()
export class EntryService {
    newEntry: Entry;
    user: User;
    entries: Array<Entry>;
    server: string = JLockConstants.HOSTURL;

    constructor(private http: Http, private load: LoadingController) {
        this.entries = new Array<Entry>();
        this.user = <User>{};

    }

    addEntries(): Observable<Array<Entry>> {
        this.newEntry.clientAccountNumber = this.user.id;
        return this.http.post(this.server + '/entry/add', this.newEntry)
            .map((response) => {
                return response.json();
            })
    }

    deleteEntry(entry: Entry): Observable<Array<Entry>> {
        let request: RequestOptionsArgs = {
            body: entry
        }
        return this.http.delete(this.server + '/entry/delete', request)
            .map((response) => {
                return response.json();
            })
    }



    resetNewEntry() {
        console.log('resetting new entry');
        this.newEntry = <Entry>{};
    }

    processUser(httpResponse) {
        this.user = httpResponse;
        console.log('returned user', this.user);
    }


    processEntries(httpResponse) {
        this.entries = httpResponse;
        console.log('processing entries', this.entries);
    }


}