import { Component } from '@angular/core';

import { EntryService } from '../entry.service';
import { Entry } from '../../../model/Entry';

@Component({
    templateUrl: './addModal.component.html'
})
export class AddModalComponent {
    close: Event;
    generatePassword: boolean;

    constructor(private entryService: EntryService) {
        this.entryService.resetNewEntry();
        console.log('modal opened');
        this.close = new Event('closeModal');
    }

    closeModal() {
        console.log('closing modal');
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