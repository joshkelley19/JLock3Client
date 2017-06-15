import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';

import { EntryComponent } from '../entry/entry.component';
import { PreferencesComponent } from '../preferences/preferences.component';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab3Root: any = ContactPage;
  entryRoot: any = EntryComponent;
  preferencesRoot: any = PreferencesComponent;

  constructor() {

  }
}
