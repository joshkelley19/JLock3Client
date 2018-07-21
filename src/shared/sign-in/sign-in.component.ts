import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { User } from '../../model';
import { AuthorizationService } from '../authorization.service';

@Component({
    templateUrl: './sign-in.component.html'
})
export class SignInComponent {
    newUser: User = <User>{};

    constructor(private nav: NavController, private auth: AuthorizationService) {
    }

    signUp() {
        console.log('sign in modal nav', this.nav);
        this.auth.setIdentity({ userName: this.newUser.userName, password: this.newUser.password });
        // get user info to confirm existing user
        this.close();
    }

    close() {
        this.nav.pop();
    }
}