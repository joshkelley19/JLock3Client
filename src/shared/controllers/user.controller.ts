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
    userSubject: Subject<User>;

    constructor(private http: Http, private auth: AuthorizationService) {
        this.initializeService();
    }

    getUser(token: string) {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);
        let args: RequestOptionsArgs = {
            headers
        }
        console.log('Authorizing with token = ', token);
        return this.http.get(JLockConstants.HOSTURL + '/user/', args)
            .map(response => {
                // get principal user
                let returnedUser = response.json();
                console.log('user response', returnedUser.principal.user);
                return returnedUser.principal.user;
            });
    }

    getUserSubject() {
        return this.userSubject;
    }

    processUser(httpResponse) {
        this.auth.user = httpResponse;
        console.log('returned user', this.auth.user);
    }

    setUserSubscription() {
        this.auth.getAuthSubject()
            .filter((data: SubjectData) => {
                console.log('userFunctionId ', this.userFunctionId, ' data.functionId ', data.functionId)
                return data.functionId !== undefined && this.userFunctionId === data.functionId;
            })
            .subscribe((data: SubjectData) => {
                if (data.token !== null && data.token !== undefined) {
                    this.getUser(data.token)
                        .subscribe((user: User) => {
                            console.log('sending to user subject ', user);
                            this.userSubject.next(user);
                        })
                }
            });
        console.log('Local storage', localStorage);
    }

    initializeService() {
        this.userFunctionId = this.auth.generateFunctionId();
        this.userSubject = new Subject<User>();
        this.setUserSubscription();
    }
}