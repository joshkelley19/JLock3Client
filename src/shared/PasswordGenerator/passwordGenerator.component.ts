import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import { PasswordGeneratorService } from './passwordGenerator.service';
import { PasswordConfig } from '../../model/PasswordConfig';
import { CharacterConfig } from '../../model/CharacterConfig';
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
    passwordConfig: PasswordConfig;
    minimum: number = JLockConstants.Generator.MIN;
    maximum: number = JLockConstants.Generator.MAX;
    // letters: boolean;
    // numbers: boolean;
    // symbols: boolean;

    constructor(private generator: PasswordGeneratorService) {
        this.passwordConfig = <PasswordConfig>{length: this.minimum,charStandard: false,lowerCase: null};
        // todo radio buttons(2, none/any). checkbox to set specific amount 
    }

    ngOnChanges() {
        this.resetAll;
    }

    createNewPassword() {
        // todo option for sliding scale to specify specific amounts

        // todo send uppercase only if case is unimportant, convert to random (r) 
        this.generator.generatePassword(this.passwordConfig)
            .subscribe((password) => {
                // this.createdPassword = JSON.stringify(password);
                this.createdPassword = password;
                console.log('returned password',password);
            }, (error) => {
                console.error('There was an issue with creating the password: ' + error);
            }, () => {
                console.log('Password created');
                this.returnPasswordEvent.emit(this.createdPassword);
            });
    }

    randomizePassword() {
        this.passwordConfig.custom = false;
        console.log('randomizing', this.passwordConfig);
        // this.returnPasswordEvent.emit({ data: { maintain: false, password: this.createdPassword } });
    }

    resetAll() {
        this.resetConfig();
        this.resetPassword();
    }

    resetConfig() {
        this.passwordConfig = <PasswordConfig>{};
    }

    resetPassword() {
        this.createdPassword = <string>{};
    }
}