import { Component } from '@angular/core';

import { AlertController, NavController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

import { FirebaseProvider } from '../../providers/firebase/firebase'

import { FirebaseListObservable } from 'angularfire2/database';

import { UserOptions } from '../../interfaces/user-options';

import { EditMapa } from './mapa-about';
import { EditTime } from './schedule-about'
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
  horario: any=[];

  mapa: any = { id: "", lat: "", lng: "", name: "" }
  timenow='11:30'


  constructor(
    public alertCtrl: AlertController,
    public nav: NavController,
    public userData: UserData,
    public firebase: FirebaseProvider,
    public network: Network,
    public popoverCtrl: PopoverController
  ) {
    this.maps =  this.firebase.FireMaps();
    this.schedules = this.firebase.FireSchedule('');
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

  presentpopupmap(event: Event, data: any, rota) {
    console.log(rota)
    let popover = this.popoverCtrl.create(EditMapa, { data });
    popover.present({ ev: event });

    popover.onDidDismiss(data => {
      if (data != null) {
        this.mapa = data
        this.saveMap(data,rota);
      }
    })
  }
  presenttime(event: Event,key:any, data: any, rota){
    console.log(rota)
    let popover = this.popoverCtrl.create(EditTime, { data });
    popover.present({ ev: event });

    popover.onDidDismiss(newdata => {
      this.saveTime(key,newdata,rota)
    })
  }
  printh(hora){
    if(hora){
      return Object.getOwnPropertyNames(hora);
    }
    return []
  }
  gethorario(rota){
    this.horario=this.firebase.FireSchedule(rota+"/util").subscribe( (a)=>{
      return a.forEach(() =>{
        return a
      })
    })
  }

  saveTime(key,newdata,rota){
    try{
      if(key!=" "){
        this.firebase.FireSchedule(rota+"/util/").remove(key);
      }
        this.firebase.FireSchedule(rota+"/util/").push(newdata).then(()=>{
          console.log("Inserido??")
        })
    }
    catch(err){
      console.error(err)
    }
  }

  async relacionaMap(id,destino){
    try{
      let i=0
      this.firebase.FireSchedule(destino+'/rota/').subscribe( (a)=>{
        console.log(a)
        a.forEach(()=>{
          i++
        })
      })
      this.firebase.FireSchedule(destino+'/rota/'+i)
      .push(id).set(id)

    }
    catch(err){
      console.error(err)
    }
  }

  async saveMap(insert: any,rota:any){
    try{
      if(insert.$key){
        this.maps.update(insert.$key,insert).then( ()=>{
          console.log("Mapa atualizado")
        })
      }
      else if(!insert.$key){
        let i=0
        this.maps.subscribe( (map)=>{
          map.forEach( ()=>{
            i++;
          })
        })
        
        this.maps.update(i.toString(),insert).then( ()=>{
          this.relacionaMap(insert.id,rota)
          console.log(i,"Mapa adicionado")
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
