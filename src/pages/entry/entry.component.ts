import { Component } from '@angular/core';
import {
    ModalController, Modal, NavController,
    LoadingController, Loading
} from 'ionic-angular';
import 'rxjs';

import { AddModalComponent } from './addModal/addModal.component';
import { EntryDetailComponent } from './entryDetail/entryDetail.component';
import { Entry, User } from '../../model';
import { EntryController } from '../../shared/controllers/entry.controller';
import { UserController } from '../../shared/controllers/user.controller';
import { AuthorizationService } from '../../shared/authorization.service';

@Component({
    selector: 'entries',
    templateUrl: './entry.component.html'
})
export class EntryComponent {
    // entries: Array<Entry>;
    alphabet: Array<string>;
    addModal: Modal;
    loading: Loading;
    compId: number;

    constructor(private entryController: EntryController, private modalCtrl: ModalController,
        private nav: NavController, private load: LoadingController,
        private userController: UserController, private auth: AuthorizationService) {
        // todo add initialize function
        // this.loadEntries();
        console.log('entry component constructor');
        this.alphabet = ['A', 'B', 'C', 'D', 'E', 'F',
            'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q',
            'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        // todo add support for numbers/special characters

        // todo add logic to refresh page on ALL loads. Refresh Event?

        addEventListener('closeModal', () => {
            this.closeModal();
        });

        this.loading = this.load.create({
            content: 'Entries are loading',
            spinner: 'bubbles'
            // bubbles circles crescent dots
        });
    }

    ionViewDidEnter() {
        if (!this.entryController.entries || !this.entryController.entries.length) {
            console.log('checking if view did enter', event);
            this.loadEntries();
        }
    }

    loadEntries() {
        // this.loading.present();
        console.log('authenticating from entry component');
        this.auth.authenticate()
            .flatMap(val => {
                console.log('TESTING first flatmap', val);
                return this.userController.getUser();
            })
            .subscribe((user: User) => {
                console.log('TESTING retrieved user', user);
                this.userController.processUser(user);
                this.getEntries();
                this.auth.authResponse(true);
            }, error => {
                console.error('auth failed', error);
                this.auth.authResponse(false);
                // this.loading.dismiss();
            }, () => {
                console.log('User load finished');
                // this.loading.dismiss();
                // same logic to get entries
            });        // this.auth.preServiceCall(this.userController.userFunctionId);
    }

    getEntries() {
        this.entryController.getEntries()
            .subscribe((response) => {
                this.entryController.processEntries(response);
                // this.loading.dismiss();
            }, (error) => {
                console.error('There was an issue obtaining your entries: ' + error);
                // this.loading.dismiss();
            }, () => {
            });
        // this.auth.preServiceCall(this.entryController.getEntryFunctionId);
    }

    selectEntry(entry: Entry) {
        // let navOptions: NavOptions = {

        // }
        console.log(entry);
        this.nav.push(EntryDetailComponent, { entry });
    }

    addEntry() {
        console.log('opening add entry...');
        this.addModal = this.modalCtrl.create(AddModalComponent);
        this.addModal.present();
    }

    closeModal() {
        this.addModal.dismiss();
    }
}