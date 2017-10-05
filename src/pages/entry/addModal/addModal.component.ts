import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

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

    constructor(private entryController: EntryController, private userController: UserController,
        private nav: NavController, private auth: AuthorizationService) {

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

    closeModal() {
        console.log('closing modal');
        this.nav.pop();
        this.entrySub.unsubscribe();
    }

    addNewEntry() {
        console.log('new entry to be added', this.entryController.newEntry);
        // todo add pre service call

        this.auth.preServiceCall(this.entryController.addEntryFunctionId);
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
}