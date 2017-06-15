import { Component } from '@angular/core';
import { Vibration, LocalNotifications } from 'ionic-native';

@Component({
    selector: 'preferences',
    templateUrl: './preferences.component.html'
})
export class PreferencesComponent {
    pushNotifications: boolean;

    constructor() {
        console.log('sending a notification');
        // TODO import local notification library
        this.pushNotifications = false;
        LocalNotifications.schedule({
            id: 1,
            title: 'Test Notification',
            text: 'Sample Notification'
        });
    }

    vibrate() {
        console.log('should be vibrating right now');
        // this.vib.vibrate([1000, 100, 1000, 100, 4000]);
        Vibration.vibrate([1000, 100, 1000, 100, 4000]);
    }

    doNothing() {
        console.log('doing nothing');
    }
}