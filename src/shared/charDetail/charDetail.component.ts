import { Component, Input, Output, EventEmitter } from '@angular/core';

import { CharacterConfig } from '../../model/CharacterConfig';

@Component({
    selector: 'char-detail',
    templateUrl: './charDetail.component.html'
})
export class CharDetailComponent {
    none = CharacterConfig.STATUS.NONE;
    custom = CharacterConfig.STATUS.CUSTOM;
    plus = CharacterConfig.STATUS.ONEPLUS;

    charConfig: CharacterConfig;
    advanced: boolean;
    @Input() header: string;
    @Output() output = new EventEmitter();

    constructor() {
        console.log('char detail open');
        this.charConfig = <CharacterConfig>{amount: 0, type: CharacterConfig.STATUS.NONE};
    }

    setConfigStatus(status: CharacterConfig.STATUS) {
        this.charConfig.type = status;
        this.setCharConfig();
    }

    setCharConfig() {
        this.output.emit(this.charConfig);
        console.log('Char Config', this.charConfig);
    }
}