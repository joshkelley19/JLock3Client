import { Component } from '@angular/core';
import { Http } from '@angular/http';
import {
    ModalController, Modal, NavController, NavOptions,
    LoadingController, Loading
} from 'ionic-angular';

import { EntryService } from './entry.service';
import { AddModalComponent } from './addModal/addModal.component';
import { EntryDetailComponent } from './entryDetail/entryDetail.component';
import { Entry } from '../../model/Entry';
import { Identity } from '../../model/Identity';
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
    userController: UserController;
    a: Identity;

    constructor(private entry: EntryService, private modalCtrl: ModalController,
        private nav: NavController, private load: LoadingController,
        private http: Http) {
        this.alphabet = ['A', 'B', 'C', 'D', 'E', 'F',
            'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q',
            'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        this.userController = new UserController(this.http, this.entry.server);

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


    // getUser(id: number) {
    //     this.http.get(this.entry.server + '/user/' + id)
    //         .map(response => {
    //             return response.json();
    //         })
    //         .subscribe(response => {
    //             this.entry.processUser(response);
    //         }, (error) => {
    //             console.error('There was an error retrieving user #' + id, error);
    //             this.loading.dismiss();
    //         }, () => {
    //             console.log('User load finished');
    //             this.getEntries(this.entry.user.id);
    //         })
    // }

    // getEntries(userId: number) {
    //     this.http.get(this.entry.server + '/entry/' + userId)
    //         .map((response) => {
    //             return response.json();
    //         })
    //         .subscribe((response) => {
    //             this.entry.processEntries(response);
    //             console.log('received response', response);
    //         }, (error) => {
    //             console.error('There was an issue obtaining your entries: ' + error);
    //             this.loading.dismiss();
    //         }, () => {
    //             console.log('Received entries');
    //             this.loading.dismiss();
    //         })
    // }

    getUser(id: number, identity: Identity) {
        this.userController.getUser(id, identity)
            .subscribe(response => {
                this.entry.processUser(response);
            }, error => {
                console.error('auth failed', error);
            }, () => {
                console.log('User load finished');
                this.getEntries(id, identity);
            })

    }

    getEntries(id: number, identity: Identity) {
        this.userController.getEntries(id, identity)
            .subscribe((response) => {
                this.entry.processEntries(response);
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