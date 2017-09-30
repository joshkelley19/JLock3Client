import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromevent';
import { Observer } from 'rxjs/Observer';

import { EntryController } from '../../../shared/controllers/entry.controller';
import { UserController } from '../../../shared/controllers/user.controller';
import { AuthorizationService } from '../../../shared/authorization.service';

@Component({
    templateUrl: './entryDetail.component.html'
})
export class EntryDetailComponent {
    showPassword: boolean = false;
    editingEntry: boolean = false;
    showingErrors: boolean = false;
    confPass: string;
    observable: Observable<any>;
    observer: Observer<string>;
    count: number = 0;

    constructor(private params: NavParams, private nav: NavController,
        private entryController: EntryController, private userController: UserController,
        private auth: AuthorizationService) {

        this.entryController.getGetEntrySubject()
            .subscribe(response => {
                this.entryController.processEntries(response);
            }, (error) => {
                this.nav.pop();
            }, () => {
                console.log('popping nav');
                this.nav.pop();
            });

        console.log('nav params service', this.params);
        this.observer = {
            next: (string) => {
                console.log('observable worked', string);
            },
            error: (error) => {
                console.log('something went wrong with your observable: ', error);
            },
            complete: () => {
                console.log('observable is terminated');
            }
        }
        this.entryController.selectedEntry = this.params.data.entry;
    }

    bindObservable() {
        let el: HTMLElement = document.getElementById('1');
        this.observable = Observable.fromEvent(el, 'input');
        console.log('found element', el)
        this.observable.subscribe(this.observer);
    }

    toggleShowPassword() {
        this.showPassword = !this.showPassword;
        console.log('show password?', this.showPassword);
    }

    loadEdit() {
        this.confPass = '';
        this.entryController.selectedEntry = this.params.data.entry;
        this.editingEntry = true;
    }

    cancelEdit() {
        this.confPass = '';
        this.entryController.resetSelectedEntry();
        this.editingEntry = false;
        this.showingErrors = false;
    }

    saveEditedEntry() {
        console.log('saving edited entry');
        // todo separate entry being edited from saved entry
        //fix edit logic and service call

        this.auth.preServiceCall(this.entryController.addEntryFunctionId);
    }

    deleteEntry() {
        this.auth.preServiceCall(this.entryController.deleteEntryFunctionId);
    }

    showErrors() {
        this.showingErrors = true;
        console.log('showing errors', this.showingErrors);
    }

    inputInstance() {
        // this.observer.next(this.entryService.newEntry.website);
    }
}