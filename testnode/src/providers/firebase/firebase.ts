import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { AngularFireDatabase } from 'angularfire2/database';
 
@Injectable()
export class FirebaseProvider {
 
  constructor(public afd: AngularFireDatabase, public http: Http) { }
 
  getAll() {
    let mapa=this.afd.list('/map/')

    return mapa;
  }
  get(){
    return this.afd.list('/').subscribe( obj => obj )
  }
}