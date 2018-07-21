import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Headers, Response } from '@angular/http';
import {
    ModalController, Modal
} from 'ionic-angular';
import { Observable, Subject } from 'rxjs';
import 'rxjs';

import { JLockConstants } from './constants';
import { Identity, User } from '../model';
import { SignInComponent } from './sign-in/sign-in.component';


@Injectable()
export class AuthorizationService {
    authenticated: boolean;
    identity: Identity;
    user: User;
    failedFunction: number;
    callAttempted: boolean = false;
    private _authToken: string;
    private _refreshToken: string;
    private _authResponseNotification: Subject<boolean>;

    constructor(private http: Http, private modalCtrl: ModalController) {
        this.initializeService();
    }

    retry(user: string, pass: string): void {
        let identity: Identity = {
            userName: user,
            password: pass
        }
        this.identity = identity;
        this.retryFailedCall();
    }

    authenticate(): Observable<any> {
        let headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let args: RequestOptionsArgs = {
            // withCredentials: true,
            headers: headers
        }
        let accessTokenString: string = JLockConstants.HOSTURL + '/oauth/token?username=' +
            this.identity.userName + '&password=' + this.identity.password +
            '&grant_type=password&client_id=' + JLockConstants.Client.id +
            '&client_secret=' + JLockConstants.Client.secret;
        let refreshTokenString: string = JLockConstants.HOSTURL
            + '/oauth/token?grant_type=refresh_token&client_id=' + JLockConstants.Client.id +
            '&client_secret=' + JLockConstants.Client.secret + '&refresh_token=' + this._refreshToken;
            console.log('authenticating');            
        return this.http.post(accessTokenString, args)
            .map((response: Response) => {
                console.log('mapping initial access token attempt', response);
                let responseData = response.json();
                this._authToken = responseData.access_token
                this._refreshToken = responseData.refresh_token;
                let preAuthData = {
                    data: response.json(),
                    ok: response.ok
                }
                // if(call fails in any way){
                // store failed observable
                //     Observable.throw('Failure to authenticate');
                // }
                return preAuthData;
            })
            .catch(err => {
                // return err;
                console.error('caught token attempt error', err);
                return this.http.post(refreshTokenString, args)
                    .map((response: Response) => {
                        console.log('mapping refresh token attempt', response);
                        let responseData = response.json();
                        this._authToken = responseData.access_token
                        this._refreshToken = responseData.refresh_token;
                        let preAuthData = {
                            data: response.json(),
                            ok: response.ok
                        }
                        // if(call fails in any way){
                        // store failed observable
                        //     Observable.throw('Failure to authenticate');
                        // }
                        return preAuthData;
                    });
            });
    }

    signUp(user: User) {
        this.http.post(JLockConstants.HOSTURL + '/user/add', user)
            .subscribe(response => {
                console.log('add user response', response);
            }, error => {
                console.error('add user error ', error);
            })
    }

    authResponse(success: boolean) {
        this.authenticated = success;
        this.callAttempted = true;
        this._authResponseNotification.next(success);
    }

    retryFailedCall() {
        // this.preServiceCall(this.failedFunction);
    }

    getAuthentication(): boolean {
        return this.authenticated;
    }

    generateFunctionId(): number {
        // todo set id manually to avoid conflicts
        return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    }

    setIdentity(identity: Identity) {
        this.identity = identity;
    }

    getArgs(): RequestOptionsArgs {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this._authToken);
        console.log('Authorizing with token = ', this._authToken);
        let args: RequestOptionsArgs = {
            headers
        }
        return args;
    }

    get authResponseNotification() {
        return this._authResponseNotification;
    }

    initializeService() {
        this.authenticated = false;
        this.identity = {
            userName: 'lilrickys',
            password: 'bloop'
        };
        this._authToken = '';
        this._refreshToken = '';
        this._authResponseNotification = new Subject<boolean>();
        this._authResponseNotification.subscribe(response => {
            console.log('auth response from auth service', response);
        });
    }
}