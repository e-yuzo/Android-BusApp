import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Items } from '../../providers/providers';
import { Item } from '../../models/item';

@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  item: any;
  di: any;
  hora: any;
  
  constructor(public navCtrl: NavController, navParams: NavParams,public items: Items) {
    this.item = navParams.get('item') || items.defaultItem;
	this.di=1;
	this.sethora();
  }
  sethora(){
	  this.hora= Date();
	  setTimeout(()=>{this.sethora()}, 1000); 
  }
  reverse() {
	  if(this.item.destino!="Terminal")
		  this.item= this.items.query({origem: this.item.destino})[0];
	  else
		  this.item= this.items.query({destino: this.item.origem})[0];
  }

  
}