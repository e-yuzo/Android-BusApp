//import { FirebaseProvider } from './../../providers/firebase/firebase';
import { Component } from '@angular/core';
import { PopoverController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { PopoverPage } from '../about-popover/about-popover';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})

export class AboutPage {
  descriptions: FirebaseListObservable<any[]>;
  constructor(public navCtrl: NavController,  public popoverCtrl: PopoverController, public firebaseProvider: FirebaseProvider) {
    this.descriptions = this.firebaseProvider.getAll();
  }
  
  conferenceDate = '2047-05-17';

  presentPopover(event: Event) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({ ev: event });
  }
}