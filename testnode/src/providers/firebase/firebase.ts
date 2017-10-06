import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { AngularFireDatabase } from 'angularfire2/database';
 
@Injectable()
export class FirebaseProvider {
 
  constructor(public afd: AngularFireDatabase, public http: Http) { }
 
  getAll() {
    return this.afd.list('/map/');
  }
}