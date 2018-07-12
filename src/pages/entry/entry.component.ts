import { Component } from '@angular/core';
import {
    ModalController, Modal, NavController, NavOptions,
    LoadingController, Loading
} from 'ionic-angular';

import { AddModalComponent } from './addModal/addModal.component';
import { EntryDetailComponent } from './entryDetail/entryDetail.component';
import { Entry, User, Identity } from '../../model';
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
        this.userResponse();
        this.entriesResponse();
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

        // this.loading.present().then(() => {
            this.loadEntries();
        // });

    }

    loadEntries() {
        console.log('starting up');
        this.auth.preServiceCall(this.userController.userFunctionId);
    }

    userResponse() {
        this.userController.getUserSubject()
            .subscribe((user: User) => {
                this.userController.processUser(user);
                this.getEntries();
            }, error => {
                console.error('auth failed', error);
            }, () => {
                console.log('User load finished');
                // same logic to get entries
            });
    }

    getEntries() {
        this.auth.preServiceCall(this.entryController.getEntryFunctionId);
    }

    entriesResponse() {
        this.entryController.getGetEntrySubject()
            .subscribe((response) => {
                this.entryController.processEntries(response);
                // this.loading.dismiss();
            }, (error) => {
                console.error('There was an issue obtaining your entries: ' + error);
                // this.loading.dismiss();
            }, () => {
            });

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