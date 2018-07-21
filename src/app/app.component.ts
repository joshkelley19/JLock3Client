import { Component, ViewChild } from '@angular/core';
import { Platform, Modal, ModalController, NavController, Tabs } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';

import { AuthorizationService } from '../shared/authorization.service'
import { SignInComponent } from '../shared/sign-in/sign-in.component';
import { TabsService } from '../pages/tabs/tabs.service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;
  userName: string;
  password: string;
  signInModal: Modal;

  @ViewChild('nav') nav: NavController;

  constructor(platform: Platform, private auth: AuthorizationService, private modalCtrl: ModalController,
    private tabService: TabsService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    this.auth.authResponseNotification.subscribe(authResponse => {
      console.log('Authorization response subject', authResponse);
      if (authResponse === true) {
        this.closeSignInModal();
      } else {
        (this.nav.getActiveChildNav() as Tabs).select(0);
        this.displaySignInModal();
      }
    });
  }


  displaySignInModal() {
    if (!this.signInModal) {
      this.signInModal = this.modalCtrl.create(SignInComponent, null, { enableBackdropDismiss: false });
      this.signInModal.present();
      this.signInModal.didLeave
        .first()
        .subscribe(closed => {
          this.signInModal = null;
        });
      console.log('sign in data', this.signInModal.data);
    }
  }

  closeSignInModal() {
    if (this.signInModal) {
      this.signInModal.dismiss();
    }
  }

}
