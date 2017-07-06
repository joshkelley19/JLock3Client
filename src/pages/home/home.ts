import { Component } from '@angular/core';
import { Http, Headers, RequestOptionsArgs } from '@angular/http';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private http: Http) {

  }

  auth() {
    let headers: Headers = new Headers();
    let args: RequestOptionsArgs = {
      headers
    }
    headers.append('Authorization', 'Basic ' + btoa('youngfred'+':'+'test'));
    this.http.get('http://localhost:8080/user', args)
      .subscribe((response) => {
        console.log('Authentication response', response);
      }, (error) => {
        console.error('Error authenticating: ', error);
      }, () => {
        console.log('Authentication finished and successful');
      })
  }

}
