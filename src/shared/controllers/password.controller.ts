import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { PasswordConfig } from '../../model/PasswordConfig';
import { JLockConstants } from '../constants';

@Injectable()
export class PasswordController {
    baseUrl: string;

    constructor(private http: Http) {
    }



    getRandomizedPassword(password: PasswordConfig): Observable<Response> {
        return this.http.post(JLockConstants.HOSTURL, password);
    }

    getCustomizedPassword(password: PasswordConfig): Observable<Response> {
        return this.http.post(JLockConstants.HOSTURL, password);
    }

    generatePassword(passwordDetails: PasswordConfig): Observable<string> {
        return this.http.post(JLockConstants.HOSTURL + '/any', passwordDetails)
            .map((response) => {
                return response.text();
            });
    }
}