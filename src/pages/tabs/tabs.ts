import { Component, ViewChild } from '@angular/core';

import { HomePage } from '../home/home';
import { ContactPage } from '../contact/contact';

import { EntryComponent } from '../entry/entry.component';
import { PreferencesComponent } from '../preferences/preferences.component';
import { TabsService } from './tabs.service';
import { Tabs } from '../../../node_modules/ionic-angular';

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
  constructor(private tabService: TabsService) {
  }

  onTabChange(data){
    console.log('Tab change to', data);
    //check authorized on first change
  }
}
