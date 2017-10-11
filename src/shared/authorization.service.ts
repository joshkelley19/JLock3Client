import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Headers } from '@angular/http';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

import { JLockConstants } from './constants';
import { Identity, User, SubjectData } from '../model';

@Injectable()
export class AuthorizationService {
    authenticated: boolean;
    authToken: string;
    identity: Identity;
    authSubject: Subject<any>;
    user: User;
    failedFunction: number;
    callAttempted: boolean = false;

    constructor(private http: Http) {
        this.initializeService();
    }

    authenticate(user: string, pass: string): void {
        let identity: Identity = {
            userName: user,
            password: pass
        }
        this.identity = identity;
        this.retryFailedCall();
    }

    preServiceCall(functionId: number): void {
        let headers: Headers = new Headers();
        // let auth = 'Basic ' + btoa('josh' + ':' + 'joshsecret');
        // headers.append('Authorization', auth);
        headers.append('Content-Type', 'application/json');
        let args: RequestOptionsArgs = {
            // withCredentials: true,
            headers: headers/*,
            search: urlParams*/
        }
        let data: SubjectData = <SubjectData>{};
        this.http.post(JLockConstants.HOSTURL + '/oauth/token?username=' +
            this.identity.userName + '&password=' + this.identity.password +
            '&grant_type=password&client_id=' + JLockConstants.Client.id +
            '&client_secret=' + JLockConstants.Client.secret, args)
            .subscribe(response => {
                let r = response.json();
                console.log('auth response', r.access_token);
                // todo return token
                data = {
                    functionId: functionId,
                    token: r.access_token
                }
                this.authSubject.next(data);
                this.authSuccessful(true);
            }, error => {
                // show sign in
                this.authSubject.next(Observable.throw('No token available'));
                console.error('Sign In failed', error);
                this.authSuccessful(false);
                this.failedFunction = functionId;
            })
    }

    authSuccessful(success: boolean) {
        this.authenticated = success;
        this.callAttempted = true;
    }

    retryFailedCall() {
        this.preServiceCall(this.failedFunction);
    }

    getAuthentication(): boolean {
        return this.authenticated;
    }

    getAuthSubject(): Subject<any> {
        return this.authSubject;
    }

    generateFunctionId(): number {
        // todo set id manually to avoid conflicts
        return Math.floor(Math.random() * 1000000000);
    }

    setIdentity(identity: Identity) {
        this.identity = identity;
    }

    getArgs(token: string): RequestOptionsArgs {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);
        console.log('Authorizing with token = ', token);
        let args: RequestOptionsArgs = {
            headers
        }
        return args;
    }

    initializeService() {
        this.authenticated = false;
        this.identity = <Identity>{};
        this.authToken = '';
        this.authSubject = new Subject();
    }
}