import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { ConferenceData } from '../../providers/conference-data';



@IonicPage({
  segment: 'session/:sessionId'
})
@Component({
  selector: 'page-session-detail',
  templateUrl: 'session-detail.html'
})

export class SessionDetailPage {
  session: any;
  dias: any;
  route: any=[]
  constructor(
    public dataProvider: ConferenceData,
    public navParams: NavParams,
    ) {
  }

  ionViewWillEnter() {// encontra qual a rota atual
    this.dataProvider.load().subscribe((data: any) => {
      if (
        data &&
        data.schedule &&
        data.schedule[0] &&
        data.schedule[0].groups
      ) {
        for (const group of data.schedule[0].groups) {
          if (group && group.sessions) {
            for (const session of group.sessions) {
              if (session && session.id === this.navParams.data.sessionId) {
                this.session = session;
                break;
              }
            }
          }
        }
      }
    })
    let way: any= []
    this.route=this.session.rota
    this.dataProvider.getMap().subscribe((mapData: any) => {
      
      // Salva os pontos da rota atual em way 
      this.route.forEach((route)=>{
        mapData.forEach((markerData: any) => {
          if(markerData.id == route)
            way.push(markerData.name)
        })
      })
    })

    this.route=way
  }
  
  
}
