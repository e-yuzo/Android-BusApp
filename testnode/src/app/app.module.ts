import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';

import { ConferenceApp } from './app.component';

import { MapPage } from '../pages/map/map';

import { SchedulePage } from '../pages/schedule/schedule';
import { ScheduleFilterPage } from '../pages/schedule-filter/schedule-filter';
import { SessionDetailPage } from '../pages/session-detail/session-detail';

import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';

import { FirebaseProvider } from '../providers/firebase/firebase';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import {AngularFireModule } from 'angularfire2';

var config = {
  apiKey: "AIzaSyDLgvTbk8vvie6raQ1ubJ28SMHphyKP-xo",
  authDomain: "fir-113b6.firebaseapp.com",
  databaseURL: "https://fir-113b6.firebaseio.com",
  projectId: "fir-113b6",
  storageBucket: "fir-113b6.appspot.com",
  messagingSenderId: "159937614660"
};

@NgModule({
  declarations: [
    ConferenceApp,
    MapPage,
    SchedulePage,
    ScheduleFilterPage,
    SessionDetailPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(ConferenceApp, {}, {
      links: [
        { component: SchedulePage, name: 'Schedule', segment: 'schedule' },
        { component: SessionDetailPage, name: 'SessionDetail', segment: 'sessionDetail/:sessionId' },
        { component: ScheduleFilterPage, name: 'ScheduleFilter', segment: 'scheduleFilter' },
        { component: MapPage, name: 'Map', segment: 'map' }
      ]
    }),
    IonicStorageModule.forRoot(),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(config),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    MapPage,
    SchedulePage,
    ScheduleFilterPage,
    SessionDetailPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ConferenceData,
    UserData,
    InAppBrowser,
    SplashScreen,
    FirebaseProvider
  ]
})
export class AppModule { }
