import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';

import { Identity, User, SubjectData } from '../../model';
import { JLockConstants } from '../constants';
import { AuthorizationService } from '../authorization.service';

@Injectable()
export class UserController {
    userFunctionId: number;

    constructor(private http: Http, private auth: AuthorizationService) {
        this.initializeService();
    }

    getUser(): Observable<any> {
        // let headers = new Headers();
        // headers.append('Authorization', 'Bearer ' + this.auth.authToken);
        let args: RequestOptionsArgs = this.auth.getArgs();/* {
            headers
        } */
        console.log('get user args ', args);
        return this.http.get(JLockConstants.HOSTURL + '/user/', args)
            .map(response => {
                console.log('user response', response);
                // get principal user
                let returnedUser = response.json();
                return returnedUser.principal.user;
            });
    }

    processUser(httpResponse) {
        this.auth.user = httpResponse;
        console.log('returned user', this.auth.user);
    }

    initializeService() {
        this.userFunctionId = this.auth.generateFunctionId();
    }
}