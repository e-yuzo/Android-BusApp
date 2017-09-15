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
  dias: any = [];
  di: any;
  
  constructor(public navCtrl: NavController, navParams: NavParams,public items: Items) {
    this.item = navParams.get('item') || items.defaultItem;
	this.dias= this.item.semana;
	this.di=1;
  }
  
  reverse(item: Item) {
	  this.item= this.items.query({origem: this.item.destino})[0];
	  this.selectdays(this.di);
  }
  selectdays(dia: any){
	  this.di=dia;
	  if(dia == 1){
		  this.dias= this.item.semana;
	  }
	  else if(dia == 2){
		  this.dias= this.item.sabado;
	  }
	  else
		  this.dias= this.item.domingo;
  }
  
}