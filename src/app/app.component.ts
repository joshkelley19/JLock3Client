import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';

import { AuthorizationService } from '../shared/authorization.service'


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;
  userName: string;
  password: string;

  constructor(platform: Platform, private auth: AuthorizationService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  signIn() {
    this.auth.authenticate(this.userName, this.password);
  }
}
