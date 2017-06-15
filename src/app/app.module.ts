import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { EntryComponent } from '../pages/entry/entry.component';
import { EntryDetailComponent } from '../pages/entry/entryDetail/entryDetail.component';
import { PreferencesComponent } from '../pages/preferences/preferences.component';
import { AddModalComponent } from '../pages/entry/addModal/addModal.component';
import { PasswordGeneratorComponent } from '../shared/PasswordGenerator/passwordGenerator.component';

import { EntryService } from '../pages/entry/entry.service';
import { PasswordGeneratorService } from '../shared/PasswordGenerator/passwordGenerator.service';

import { LetterFilterPipe } from '../pages/entry/letter.pipe';
import { LetterShowPipe } from '../pages/entry/entry.pipe';

@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    HomePage,
    TabsPage,
    EntryComponent,
    AddModalComponent,
    EntryDetailComponent,
    PreferencesComponent,
    PasswordGeneratorComponent,
    LetterFilterPipe,
    LetterShowPipe
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    HomePage,
    TabsPage,
    EntryComponent,
    AddModalComponent,
    EntryDetailComponent,
    PreferencesComponent,
    PasswordGeneratorComponent
  ],
  providers: [EntryService, PasswordGeneratorService, {provide: ErrorHandler, useClass: IonicErrorHandler},]
})
export class AppModule {}
