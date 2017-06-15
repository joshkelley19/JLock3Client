import { Component } from '@angular/core';
import { ModalController, Modal, NavController, NavOptions } from 'ionic-angular';

import { EntryService } from './entry.service';
import { AddModalComponent } from './addModal/addModal.component';
import { EntryDetailComponent } from './entryDetail/entryDetail.component';
import { Entry } from '../../model/Entry';

@Component({
    selector: 'entries',
    templateUrl: './entry.component.html'
})
export class EntryComponent{
    // entries: Array<Entry>;
    alphabet: Array<string>;
    addModal: Modal;

    constructor(private entry: EntryService, private modalCtrl: ModalController, 
    private nav: NavController){
        this.alphabet = ['A','B','C','D','E','F',
        'G','H','I','J','K','L','M','N','O','P','Q',
        'R','S','T','U','V','W','X','Y','Z'];

        addEventListener('closeModal', () => {
            this.closeModal();
        })
    }

    selectEntry(entry: Entry){
        // let navOptions: NavOptions = {
            
        // }
        console.log(entry);
        this.nav.push(EntryDetailComponent,{entry});
    }

    addEntry(){
        console.log('adding entry...');
        this.addModal = this.modalCtrl.create(AddModalComponent);
        this.addModal.present();
    }

    closeModal(){
        this.addModal.dismiss();
    }
}