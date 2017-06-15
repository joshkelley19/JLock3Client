import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { JLockConstants } from '../constants';

@Injectable()
export class PasswordGeneratorService {
    genStrings = JLockConstants.Generator;

    constructor(private http: Http) {

    }

    generatePassword(scheme: string, amount?: number): Observable<string> {
        return this.http.get(this.genStrings.URL + scheme + this.genStrings.FORMAT + amount ? amount.toString() : '1')
            .map((response) => {
                return response['_body'];
            });
    }
}