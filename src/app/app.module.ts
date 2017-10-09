import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { CharDetailComponent } from '../shared/charDetail/charDetail.component';
import { SignInComponent } from '../shared/sign-in/sign-in.component';
import { ComponentPipe } from '../shared/logging/componentLevel/component.pipe'
import { ComponentLoggingComponent } from '../shared/logging/componentLevel/logging.component'

import { EntryController } from '../shared/controllers/entry.controller';
import { UserController } from '../shared/controllers/user.controller';
import { PasswordController } from '../shared/controllers/password.controller';
import { AuthorizationService } from '../shared/authorization.service';

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
    CharDetailComponent,
    SignInComponent,
    LetterFilterPipe,
    LetterShowPipe,
    ComponentPipe,
    ComponentLoggingComponent
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
    PasswordGeneratorComponent,
    CharDetailComponent,
    SignInComponent
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler },
    EntryController,
    PasswordController,
    UserController,
    AuthorizationService]
})
export class AppModule { }
