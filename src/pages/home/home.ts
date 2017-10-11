import { Component } from '@angular/core';
import { Http, Headers, RequestOptionsArgs } from '@angular/http';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  welcomeMessage: string;

  constructor(public navCtrl: NavController, private http: Http) {
    this.initializeComponent();
  }

  initializeComponent() {
    this.welcomeMessage = 'JLock';
  }
}
