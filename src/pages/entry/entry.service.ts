import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
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
    loading: Loading;

    constructor(private http: Http, private load: LoadingController) {
        this.entries = new Array<Entry>();
        this.user = <User>{};
        this.loading = this.load.create({
            content: 'Entries are loading',
            spinner: 'bubbles'
            // bubbles circles crescent dots
        })

        this.loading.present().then(() => {
            this.getUser(1);
        })
    }

    getUser(id: number) {
        this.http.get(this.server + '/user/' + id)
            .map(response => {
                return response.json();
            })
            .subscribe(response => {
                this.processUser(response);
            })
    }

    getEntries(userId: number) {
        this.http.get(this.server + '/entry/' + userId)
            .map((response) => {
                return response.json();
            })
            .subscribe((response) => {
                this.processEntries(response);
                console.log('received response', response);
                this.loading.dismiss();
            }, (error) => {
                console.error('There was an issue obtaining your entries: ' + error);
                this.loading.dismiss();
            }, () => {
                console.log('Received entries');
            })

    }

    addEntries(): Observable<Array<Entry>> {
        this.newEntry.clientAccountNumber = this.user.id;
        return this.http.post(this.server + '/entry/add', this.newEntry)
            .map((response) => {
                return response.json();
            })
    }

    processUser(httpResponse) {
        this.user = httpResponse;
        console.log('returned response for user', httpResponse);
        console.log('returned user', this.user);
        this.getEntries(this.user.id);
    }

    resetNewEntry() {
        console.log('resetting new entry');
        this.newEntry = <Entry>{};
    }

    processEntries(httpResponse) {
        this.entries = httpResponse;
    }

}