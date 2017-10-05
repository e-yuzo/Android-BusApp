import { Component, ViewChild } from '@angular/core';

import { Events, MenuController, Nav, Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';
import { MapPage } from '../pages/map/map';
import { SchedulePage } from '../pages/schedule/schedule';

import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.template.html'
})
export class ConferenceApp {
 
  @ViewChild(Nav) nav: Nav;

  appPages: PageInterface[] = [
    { title: 'Onibus', name: 'Lista de Onibus', component: SchedulePage, icon: 'bus' },
    { title: 'Mapa', name: 'Lista de pontos', component: MapPage, icon: 'map' }
  ];
  rootPage: any=SchedulePage;

  constructor(
    public events: Events,
    public userData: UserData,
    public menu: MenuController,
    public platform: Platform,
    public confData: ConferenceData,
    public storage: Storage,
    public splashScreen: SplashScreen
  ) {

    confData.load();
    this.platformReady()
  }


  platformReady() {
    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      this.splashScreen.hide();
    });
  }
  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
