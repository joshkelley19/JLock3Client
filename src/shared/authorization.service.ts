import { Injectable } from '@angular/core';

import { Identity } from '../model';

@Injectable()
export class AuthorizationService{
    authenticated: boolean;

    authenticate(identity: Identity){

    }
}