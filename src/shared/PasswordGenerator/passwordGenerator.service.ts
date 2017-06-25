import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { JLockConstants } from '../constants';
import { PasswordConfig } from '../../model/PasswordConfig';

@Injectable()
export class PasswordGeneratorService {

    constructor(private http: Http) {

    }

    generatePassword(passwordDetails: PasswordConfig): Observable<Response> {
        return this.http.post(JLockConstants.HOSTURL + '/randomizer', passwordDetails)
            .map((response) => {
                return response.json();
            });
    }
}