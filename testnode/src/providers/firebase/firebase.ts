import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class FirebaseProvider {


  Data: any



  constructor(public afd: AngularFireDatabase, public http: Http, public storage: Storage) { 
    this.Data={
      map:
      [
      ],
      schedule:
      [
        {
          date:"",
          groups: []
        }
      ]
    }

    this.storage.get("mapa").then((mapa) => {
      if (mapa) {
        this.Data.map = mapa
      }
    })

    this.storage.get("sessions").then((rota) => {
      if (rota) {
        this.Data.schedule[0].groups = rota
      }
    })
  }

  getAll() {

    return this.Data;
  }

  get() {

    this.afd.list('/map/').subscribe((mapa) => {
      let mapasalvo: any = []


      mapa.forEach((obj) => {
        mapasalvo.push(obj)
      })
      this.storage.remove("mapa")
      this.storage.set("mapa", mapasalvo)
 
      this.Data.mapa = mapasalvo
    })
    this.afd.list('/schedule/0/groups/').subscribe((rota) => {
      let route: any = []
  
      rota.forEach((obj) => {
        route.push(obj)
    })
      
      this.storage.remove("sessions")
      this.storage.set("sessions", route)
      this.Data.schedule[0]= ({ date: "2013", groups:route})
    })
  
  return this.Data
}




}