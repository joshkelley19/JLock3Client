import { Component } from '@angular/core';
import {
    ModalController, Modal, NavController, NavOptions,
    LoadingController, Loading
} from 'ionic-angular';

import { AddModalComponent } from './addModal/addModal.component';
import { EntryDetailComponent } from './entryDetail/entryDetail.component';
import { Entry } from '../../model/Entry';
import { Identity } from '../../model/Identity';
import { EntryController } from '../../shared/controllers/entry.controller';
import { UserController } from '../../shared/controllers/user.controller';

@Component({
    selector: 'entries',
    templateUrl: './entry.component.html'
})
export class EntryComponent {
    // entries: Array<Entry>;
    alphabet: Array<string>;
    addModal: Modal;
    loading: Loading;
    a: Identity;

    constructor(private entryController: EntryController, private modalCtrl: ModalController,
        private nav: NavController, private load: LoadingController,
        private userController: UserController) {
        this.alphabet = ['A', 'B', 'C', 'D', 'E', 'F',
            'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q',
            'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        // todo add support for numbers/special characters

        // todo add logic to refresh page on ALL loads. Refresh Event?

        addEventListener('closeModal', () => {
            this.closeModal();
        })

        this.loading = this.load.create({
            content: 'Entries are loading',
            spinner: 'bubbles'
            // bubbles circles crescent dots
        })
        this.a = {
            userName: 'youngfred',
            password: 'test'
        }

        this.loading.present().then(() => {
            this.getUser(1, this.a);
        })

    }

    getUser(id: number, identity: Identity) {
        this.userController.getUser(id, identity)
            .subscribe(response => {
                this.userController.processUser(response);
            }, error => {
                console.error('auth failed', error);
            }, () => {
                console.log('User load finished');
                this.getEntries(id, identity);
            })

    }

    getEntries(id: number, identity: Identity) {
        this.entryController.getEntries(id, identity)
            .subscribe((response) => {
                this.entryController.processEntries(response);
            }, (error) => {
                console.error('There was an issue obtaining your entries: ' + error);
                this.loading.dismiss();
            }, () => {
                this.loading.dismiss();
            })
    }

    selectEntry(entry: Entry) {
        // let navOptions: NavOptions = {

        // }
        console.log(entry);
        this.nav.push(EntryDetailComponent, { entry });
    }

    addEntry() {
        console.log('adding entry...');
        this.addModal = this.modalCtrl.create(AddModalComponent);
        this.addModal.present();
    }

    closeModal() {
        this.addModal.dismiss();
    }
}