import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs';

import { EntryController } from '../../../shared/controllers/entry.controller';
import { UserController } from '../../../shared/controllers/user.controller';
import { AuthorizationService } from '../../../shared/authorization.service';

@Component({
    templateUrl: './addModal.component.html'
})
export class AddModalComponent {

    close: Event;
    generatePassword: boolean;
    entrySub: Subscription;
    addForm: FormGroup;

    constructor(private entryController: EntryController, private userController: UserController,
        private nav: NavController, private auth: AuthorizationService) {

        this.initializeComponent();
    }

    closeModal() {
        console.log('closing modal');
        this.nav.pop();
        this.entrySub.unsubscribe();
    }

    addNewEntry() {
        console.log('new entry to be added', this.entryController.newEntry);
        // todo add pre service call
        this.auth.authenticate()
            .flatMap(val => {
                console.log('adding new entry with auth', val);
                return this.entryController.addEntries();
            })
            .subscribe(response => {
                console.log('all add entry response data', response);
                this.entryController.processEntries(response);
            }, err => {
                console.error('unable to authenticate and add entry', err);
            }, () => {
                this.closeModal();
            });
        // this.auth.preServiceCall(this.entryController.addEntryFunctionId);
    }

    retrievePassword(event: any) {
        console.log('in add modal retrieve event', event);
        // this.generatePassword = event.data.maintain;
        // let newPass = event.data.password;
        // console.log('retrieve password',this.generatePassword,this.addNewEntry);
        // this.entryService.newEntry.password = newPass ? newPass : 'No Password Generated';
    }

    test() {
        console.log('what\'s in new entry?', this.entryController.newEntry);
    }

    initializeComponent(): void {
        this.addForm = new FormGroup({});

        this.entrySub = this.entryController.getGetEntrySubject()
            .subscribe((response) => {
                this.entryController.processEntries(response);
                console.log('received response from post', response);
                this.entryController.resetNewEntry();
                dispatchEvent(this.close);
            }, error => {
                console.error('Error adding entries', error);
            });


        this.entryController.resetNewEntry();
        console.log('modal opened');
        this.close = new Event('closeModal');
    }
}