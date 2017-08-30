import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { EntryController } from '../../../shared/controllers/entry.controller';
import { UserController } from '../../../shared/controllers/user.controller';

@Component({
    templateUrl: './addModal.component.html'
})
export class AddModalComponent {
    close: Event;
    generatePassword: boolean;

    constructor(private entryController: EntryController, private userController: UserController,
        private nav: NavController) {

        this.entryController.resetNewEntry();
        console.log('modal opened');
        this.close = new Event('closeModal');
    }

    closeModal() {
        console.log('closing modal');
        this.nav.pop();
    }

    addNewEntry() {
        console.log('new entry to be added', this.entryController.newEntry);
        this.entryController.addEntries(this.userController.user.id)
            .subscribe((response) => {
                this.entryController.processEntries(response);
                console.log('received response from post', response);
            }, error => {
                console.error('Error adding entries', error);
            }, () => {
                this.entryController.resetNewEntry();
                dispatchEvent(this.close);
            });
    }

    retrievePassword(event: any) {
        console.log('in add modal retrieve event', event);
        // this.generatePassword = event.data.maintain;
        // let newPass = event.data.password;
        // console.log('retrieve password',this.generatePassword,this.addNewEntry);
        // this.entryService.newEntry.password = newPass ? newPass : 'No Password Generated';
    }
}