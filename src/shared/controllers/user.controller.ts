import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Identity, User } from '../../model';
import { JLockConstants } from '../constants';

@Injectable()
export class UserController {
    user: User;

    constructor(private http: Http) {
    }

    getUser(id: number, auth: Identity) {
        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(auth.userName + ':' + auth.password));
        let args: RequestOptionsArgs = {
            headers
        }
        console.log('Authorizing with', auth.userName, auth.password);
        return this.http.get(JLockConstants.HOSTURL + '/user/' + id, args)
            .map(response => {
                return response.json();
            });
    }

    processUser(httpResponse) {
        this.user = httpResponse;
        console.log('returned user', this.user);
    }
}