import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase'
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the CrudPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 export class Onibus{
   linha: string
   location: string
   name: string
   rota: any=[]
   tracks:any=[]
   util:any=[]
   sabado:any=[]
   domingo:any=[]
 }

@Component({
  selector: 'page-crud',
  templateUrl: 'crud.html',
})
export class CrudPage {
  lista: any=[];
  onibus: Onibus

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public fire: FirebaseProvider) {
      this.onibus=new Onibus()
  }

  ionViewDidLoad() {
    this.lista=Observable.of(this.fire.getOnibus());
  }

}
