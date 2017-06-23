import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { EntryService } from '../entry.service';
import { Entry } from '../../../model/Entry';

@Component({
    templateUrl: './addModal.component.html'
})
export class AddModalComponent {
    close: Event;
    generatePassword: boolean;

    constructor(private entryService: EntryService, private nav: NavController) {
        this.entryService.resetNewEntry();
        console.log('modal opened');
        this.close = new Event('closeModal');
    }

    closeModal() {
        console.log('closing modal');
        this.nav.pop();
    }

    addNewEntry() {
        console.log('new entry to be added', this.entryService.newEntry);
        this.entryService.addEntries()
            .subscribe((response) => {
                this.entryService.processEntries(response);
                console.log('received response from post', response);
                this.entryService.resetNewEntry();
                dispatchEvent(this.close)
            });
    }

    retrievePassword(event: any) {
        this.generatePassword = event.data.maintain;
        let newPass = event.data.password;
        this.entryService.newEntry.password = newPass ? newPass : 'No Password Generated';
    }
}