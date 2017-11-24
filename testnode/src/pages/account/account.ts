import { Component } from '@angular/core';

import { AlertController, NavController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

import { FirebaseProvider } from '../../providers/firebase/firebase'

import { FirebaseListObservable } from 'angularfire2/database';

import { UserOptions } from '../../interfaces/user-options';

import { EditMapa } from './mapa-about';

import { PopoverController } from 'ionic-angular';

import { Network } from '@ionic-native/network';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  username: UserOptions;

  maps: FirebaseListObservable<any[]>;
  schedules: FirebaseListObservable<any[]>;

  mapa: any = { id: "", lat: "", lng: "", name: "" }



  constructor(
    public alertCtrl: AlertController,
    public nav: NavController,
    public userData: UserData,
    public firebase: FirebaseProvider,
    public network: Network,
    public popoverCtrl: PopoverController
  ) {
    this.maps =  this.firebase.FireMaps();
    this.schedules = this.firebase.FireSchedule();
  }

  
  

  ngViewWillEnter() {
  }

  ngAfterViewInit() {
    this.getUsername();
  }


  updatePicture() {
    console.log('Clicked to update picture');
  }

  // Present an alert with the current username populated
  // clicking OK will update the username and display it
  // clicking Cancel will close the alert and do nothing
  changeUsername() {
    let alert = this.alertCtrl.create({
      title: 'Change Username',
      buttons: [
        'Cancel'
      ]
    });
    alert.addInput({
      name: 'username',
      value: this.username.username,
      placeholder: 'username'
    });
    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
        this.userData.setUsername(data);
        this.getUsername();
      }
    });

    alert.present();
  }
  EditMap(mapa) {
    this.mapa = mapa
  }

  getUsername() {
    this.userData.getUsername().then((username) => {
      this.username = username;
    });
  }

  changePassword() {
    console.log('Clicked to change password');
  }

  presentPopover(event: Event, data: any) {
    let popover = this.popoverCtrl.create(EditMapa, { data });
    popover.present({ ev: event });

    popover.onDidDismiss(data => {
      if (data != null) {
        this.mapa = data
        this.saveMap(data);
      }
    })
  }
  async saveMap(insert: any){
    try{
      if(insert.$key){
        this.maps.update(insert.$key,insert).then( ()=>{
          console.log("Mapa atualizado")
        })
      }
      else if(!insert.$key){
        this.maps.push(insert).then( ()=>{
          console.log("Mapa adicionado")
        })
      }
    }
    catch(err){
      console.log(insert)
      console.error(err)
    }
  }
  RemoveMap(insert){
    insert
  }

  logout() {
    this.userData.logout();
    this.nav.setRoot('LoginPage');
  }

  support() {
    this.nav.push('SupportPage');
  }
}
