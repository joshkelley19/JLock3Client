import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import { PasswordGeneratorService } from './passwordGenerator.service';
import { JLockConstants } from '../constants';

@Component({
    selector: 'generator',
    templateUrl: 'passwordGenerator.component.html'
})
export class PasswordGeneratorComponent implements OnChanges {
    @Input() open: boolean;
    @Output('out') returnPasswordEvent = new EventEmitter();
    length: number;
    createdPassword: string;
    minimum: number = JLockConstants.Generator.MIN;
    maximum: number = JLockConstants.Generator.MAX;
    letters: boolean;
    numbers: boolean;
    symbols: boolean;

    constructor(private generator: PasswordGeneratorService) {

    }

    ngOnChanges() {
        this.resetAll;
    }

    createNewPassword(scheme: string, amount?: number) {
        // todo allow for selection chackbox of upper/lower/number/char 
        // and option for sliding scale to specify specific amounts

        // send uppercase only if case is unimportant, convert to random (r) 
        this.generator.generatePassword(scheme, amount ? amount : null)
            .subscribe((password) => {
                this.createdPassword = password;
            }, (error) => {
                console.error('There was an issue with creating the your password: ' + error);
            }, () => {
                console.log('Password created');
                this.returnPasswordEvent.emit();
            });
    }

    randomizePassword() {
        console.log('randomizing');
        this.returnPasswordEvent.emit({ data: { maintain: false, password: this.createdPassword } });
    }

    resetAll() {
        this.length = this.minimum;
        this.createdPassword = <string>{};
        this.letters = this.numbers = this.symbols = false;
    }
}