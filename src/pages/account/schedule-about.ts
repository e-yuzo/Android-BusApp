
import { Component } from '@angular/core';

import { App, NavController, ModalController, ViewController,NavParams } from 'ionic-angular';


import { PopoverController } from 'ionic-angular';
@Component({
  template: `
  <ion-list>
  <form>
  <ion-item>
      <ion-label>Horario</ion-label>
      <ion-input type="text" [(ngModel)]="item" name="name"></ion-input>
  </ion-item>
  <button ion-button (click)="close()" block>ADD Map</button>
</form>
</ion-list>
  `
})
export class EditTime {

  item: string;
  
  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public app: App,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    
    public popoverCtrl: PopoverController
  ) { 
    this.item = this.navParams.get('data')
  }


  close() {
    this.viewCtrl.dismiss(this.item);
  }
}