import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { ConferenceData } from '../../providers/conference-data';

declare var google: any;

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
  icons: any="alarm";
  way: any = []; //caminho a ser gerado
  route: any = [];

  @ViewChild('mapCanvas') mapElement: ElementRef;
  map: any;
  constructor(
    public dataProvider: ConferenceData,
    public navParams: NavParams
  ) {}

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
    
    this.route=this.session.rota
    this.dataProvider.getMap().subscribe((mapData: any) => {
      
      // Salva os pontos da rota atual em way 
      this.route.forEach((route)=>{
        mapData.forEach((markerData: any) => {
          if(markerData.id == route)
            this.way.push({"location": markerData.lat+" , "+ markerData.lng, "stopover": false})
        })
      })

      this.load_route()
    })
  }
  
  ionViewDidLoad() {//carrega o mapa assim que a apagina é carregada
    this.dataProvider.getMap().subscribe((mapData: any) => {
      let mapEle = this.mapElement.nativeElement;

      this.map = new google.maps.Map(mapEle, {
        center: mapData.find((d: any) => d.center),
        zoom: 15
      });

      mapData.forEach((markerData: any) => {
        let infoWindow = new google.maps.InfoWindow({
          content: `<h5>${markerData.name}</h5>`
        });

        let marker = new google.maps.Marker({
          position: markerData,
          map: this.map,
          title: markerData.name
        });

        marker.addListener('click', () => {
          infoWindow.open(this.map, marker);
        });
      });
      
      google.maps.event.addListenerOnce(this.map, 'idle', () => {
        mapEle.classList.add('show-map');
      });
    });
  }
  load_route(){//carrega o caminho no qual o ônibus percorre
    if(this.way.length>0){

      let directionsDisplay = new google.maps.DirectionsRenderer({
        map: this.map
      });
      console.log(this.way)
      let request = {
        destination: this.way[this.way.length-1].location,
        origin: this.way[0].location,
        waypoints: this.way,
        optimizeWaypoints: true,
        provideRouteAlternatives: true,
        travelMode: 'DRIVING'
      };
      let directionsService = new google.maps.DirectionsService();
      
      directionsService.route(request, function(response, status) {
        if (status == 'OK') {
          // Display the route on the map.
          directionsDisplay.setDirections(response);
        }
      });
    }
  }  
}
