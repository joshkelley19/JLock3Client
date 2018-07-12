import { Component, Output, EventEmitter } from '@angular/core';

import { AuthorizationService } from '../authorization.service';
import { User } from '../../model';

@Component({
    selector: 'sign-in',
    templateUrl: './sign-in.component.html'
})
export class SignInComponent {
    newUser: User = <User>{};

    constructor(private auth: AuthorizationService) {
    }

    signUp() {
        this.auth.signUp(this.newUser);
    }
}