import { Component } from '@angular/core';

import { App, NavController, ModalController, ViewController,NavParams } from 'ionic-angular';


import { PopoverController } from 'ionic-angular';
@Component({
  template: `
  <ion-list>
  <form>
  <ion-item>
      <ion-label>id</ion-label>
      <ion-input type="number" [(ngModel)]="id" name="id"></ion-input>
  </ion-item>
  <ion-item>
      <ion-label>Endereço</ion-label>
      <ion-input type="text" [(ngModel)]="name" name="name"></ion-input>
  </ion-item>
  <ion-item>
      <ion-label>Latitude</ion-label>
      <ion-input type="number" [(ngModel)]="lat" name="lat"></ion-input>
  </ion-item>
  <ion-item>
      <ion-label>Longitude</ion-label>
      <ion-input type="number" [(ngModel)]="lng" name="lng"></ion-input>
  </ion-item>
  <button ion-button (click)="close()" block>ADD Map</button>
</form>
</ion-list>
  `
})
export class EditMapa {

  id: number=0;
  lat: number=0;
  lng: number=0;
  name: string="";
  item: any;
  
  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public app: App,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    
    public popoverCtrl: PopoverController
  ) { 
    this.item = this.navParams.get('data')
    if(this.item ==null){
      this.item={id:this.id, lat: this.lat,lng:this.lng,name:this.name}
    }
    this.id=this.item.id;
    this.lat=this.item.lat;
    this.lng=this.item.lng;
    this.name=this.item.name;
    
  }


  close() {
    this.item.id=this.id;
    this.item.lat=this.lat;
    this.item.lng=this.lng;
    this.item.name=this.name;
    this.viewCtrl.dismiss(this.item);
  }
}