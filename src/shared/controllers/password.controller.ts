import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { PasswordConfig } from '../../model/PasswordConfig';
import { JLockConstants } from '../constants';

export class PasswordController{
    constructor(private http: Http){
        // todo initialize url in constructor
    }

    getRandomizedPassword(password: PasswordConfig): Observable<Response>{
        return this.http.post(JLockConstants.HOSTURL, password);
    }

    getCustomizedPassword(password: PasswordConfig): Observable<Response>{
        return this.http.post(JLockConstants.HOSTURL, password);
    }
}