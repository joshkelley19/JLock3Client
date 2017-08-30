import { Component, OnInit } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromevent';
import { Observer } from 'rxjs/Observer';

// import { EntryController, UserController } from '../../../shared/controllers';
import { EntryController } from '../../../shared/controllers/entry.controller';
import { UserController } from '../../../shared/controllers/user.controller';

@Component({
    templateUrl: './entryDetail.component.html'
})
export class EntryDetailComponent implements OnInit {
    showPassword: boolean = false;
    editingEntry: boolean = false;
    showingErrors: boolean = false;
    confPass: string;
    observable: Observable<any>;
    observer: Observer<string>;
    count: number = 0;

    constructor(private params: NavParams, private nav: NavController,
        private entryController: EntryController, private userController: UserController) {

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
    }

    ngOnInit() {
        console.log('init');
        document.onload = () => {
            let el = document.getElementById('1');
            console.log('found element in init', el);
            el.onfocus = () => {
                this.bindObservable();
            }
        }
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
        this.entryController.newEntry = this.params.data.entry;
        this.editingEntry = true;
    }

    cancelEdit() {
        this.confPass = '';
        this.entryController.resetNewEntry();
        this.editingEntry = false;
        this.showingErrors = false;
    }

    saveEditedEntry() {
        console.log('saving edited entry');
        // todo separate entry being edited from saved entry
        //fix edit logic and service call

        this.entryController.addEntries(this.userController.user.id)
            .subscribe(response => {
                this.entryController.resetNewEntry();
                this.editingEntry = false;
                this.showingErrors = false;
            })
    }

    deleteEntry() {
        this.entryController.deleteEntry(this.params.data.entry)
            .subscribe(response => {
                this.entryController.processEntries(response);
                // todo add logic to refresh entry page
                // subscribe to emitted event from processing entries on entry comp
            }, (error) => {
                console.error('There was an error attempting to delete entry ', this.params.data.entry, error);
                this.nav.pop();
            }, () => {
                console.log('entry deleted', this.params.data.entry);
                this.nav.pop();
            })
    }

    showErrors() {
        this.showingErrors = true;
        console.log('showing errors', this.showingErrors);
    }

    inputInstance() {
        // this.observer.next(this.entryService.newEntry.website);
    }
}