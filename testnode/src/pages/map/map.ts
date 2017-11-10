import { Component, ViewChild, ElementRef } from '@angular/core';

import { ConferenceData } from '../../providers/conference-data';

import { Platform } from 'ionic-angular';

import { IonicPage, NavParams } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';


declare var google: any;


@IonicPage({
  segment: 'session/:sessionId'
})
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;


  session: any
  map: any

  @ViewChild('mapCanvas') mapElement: ElementRef;
  constructor(
    public confData: ConferenceData,
    public platform: Platform,
    public navParams: NavParams,
    public geolocation: Geolocation
  ) {
    platform.ready().then(() => {
      this.FindSession()
      if (this.session) {
        console.log(this.session.id)
      }
      this.loadMap();
    });
  }

  ionViewDidLoad() {

  }

  FindSession() {// encontra qual a rota atual
    this.confData.load().subscribe((data: any) => {
      if (
        data &&
        data.schedule &&
        data.schedule[0] &&
        data.schedule[0].groups &&
        this.navParams.data.sessionId
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
  }

  encontra_linhas() {
    let secao: any = []
    this.confData.load().subscribe((data: any) => {
      if (
        data &&
        data.schedule &&
        data.schedule[0] &&
        data.schedule[0].groups
      ) {
        for (const group of data.schedule[0].groups) {
          if (group && group.sessions) {
            for (const session of group.sessions) {
              if (session) {
                secao.push(session)
              }
            }
          }
        }
      }
    })
    return secao
  }




  calculateAndDisplayRoute() {

    let way: any = []
    let route = this.session.rota
    this.confData.getMap().subscribe((mapData: any) => {

      // Salva os pontos da rota atual em way 
      mapData.forEach((markerData: any) => {
        route.forEach((route) => {
          if (markerData.id == route)
            way.push({ "location": markerData.lat + " , " + markerData.lng, "stopover": false })
        })
      })
    })
    way= way.slice(1,way.length - 1)

    let start = way[0].location
    let end = way[way.length - 1].location

    this.directionsService.route({
      destination: end,
      origin: start,
      waypoints: way,
      travelMode: 'DRIVING',
      provideRouteAlternatives: true
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
        console.log('Map is ready!');
      }
    });
  }
  loadMap() {
    let secao: any = this.encontra_linhas()


    let markerUser;

    this.confData.getMap().subscribe((mapData: any) => {
      let mapEle = this.mapElement.nativeElement;

      this.geolocation.getCurrentPosition().then(position => {

        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        console.log(position.coords.latitude + ',' + position.coords.longitude);
        let mapOptions = {
          center: mapData.find((d: any) => d.center),
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
        }

        this.map = new google.maps.Map(mapEle, mapOptions);


        markerUser = new google.maps.Marker({ //user maker for gps
          map: this.map,
          icon: new google.maps.MarkerImage('//maps.gstatic.com/mapfiles/mobile/mobileimgs2.png',
            new google.maps.Size(22, 22),
            new google.maps.Point(0, 18),
            new google.maps.Point(11, 11)),
          position: latLng
        });
        let infoWindowUser = new google.maps.InfoWindow({
          content: "<h5>I'm here</h5>",
        });
        markerUser.addListener('click', () => {
          infoWindowUser.open(this.map, markerUser);
        });


        this.directionsDisplay.setMap(this.map);
        mapData.forEach((markerData: any) => {
          let infoWindow;
          let routes: any = []
          secao.forEach((sessao) => {
            sessao.rota.forEach((rota) => {
              if (rota == markerData.id) {
                routes.push(sessao)
              }
            })
          })
          let names: any = ""
          routes.forEach((as) => {
            names += "<p> linha: " + as.name + " </p>"
          }
          )

          infoWindow = new google.maps.InfoWindow({
            content:
            `
          <h5>Endereço:${markerData.name}</h5>
          ${names}
          `
          });

          let marker = new google.maps.Marker({
            position: markerData,
            map: this.map,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 4
            },
            draggable: true,
            title: markerData.name
          });

          marker.addListener('click', () => {
            infoWindow.open(this.map, marker);
          });

          // Evento que fecha a infoWindow com click no mapa
          google.maps.event.addListener(this.map, 'click', function () {
            infoWindow.close();
          });
        });

        google.maps.event.addListenerOnce(this.map, 'idle', () => {
          mapEle.classList.add('show-map');
        });

      }, (err) => {
        console.log(err);
      });
      this.calculateAndDisplayRoute()
      this.geolocation.watchPosition().subscribe(position => {
        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        // set marker position
        markerUser.setPosition(latLng);
      });

    });

  }
}
