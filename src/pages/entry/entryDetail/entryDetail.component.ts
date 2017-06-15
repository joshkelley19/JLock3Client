import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { EntryService } from '../entry.service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Component({
    templateUrl: './entryDetail.component.html'
})
export class EntryDetailComponent implements OnInit {
    showPassword: boolean = false;
    editingEntry: boolean = false;
    showingErrors: boolean = false;
    confPass: string;
    observable: Observable<{}>;
    observer: Observer<string>;
    count: number = 0;

    constructor(private params: NavParams, private entryService: EntryService) {
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
            console.log('found element in init',el);
            el.onfocus = () => {
                this.bindObservable();
            }
        }
    }

    bindObservable() {
        let el: HTMLElement = document.getElementById('1');
        this.observable = Observable.fromEvent(el, 'input');
        console.log('found element',el)
        this.observable.subscribe(this.observer);
    }

    toggleShowPassword() {
        this.showPassword = !this.showPassword;
        console.log('show password?', this.showPassword);
    }

    loadEdit() {
        this.confPass = '';
        this.entryService.newEntry = this.params.data.entry;
        this.editingEntry = true;
    }

    cancelEdit() {
        this.confPass = '';
        this.entryService.resetNewEntry();
        this.editingEntry = false;
        this.showingErrors = false;
    }

    saveEditedEntry() {
        console.log('saving edited entry');
        this.entryService.addEntries()
            .subscribe(response => {
                this.entryService.resetNewEntry();
                this.editingEntry = false;
                this.showingErrors = false;
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