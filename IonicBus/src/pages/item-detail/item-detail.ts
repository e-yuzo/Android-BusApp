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
  next: any;

  constructor(public navCtrl: NavController, navParams: NavParams,public items: Items) {
    this.item = navParams.get('item') || items.defaultItem;
	this.next=this.items.query({origem: this.item.destino})[0];
  }
  
  reverse(item: Item) {
	  this.item= this.next;
  }

}