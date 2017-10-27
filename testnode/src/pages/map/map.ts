import { Component, ViewChild, ElementRef } from '@angular/core';

import { ConferenceData } from '../../providers/conference-data';

import { Platform } from 'ionic-angular';



declare var google: any;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('mapCanvas') mapElement: ElementRef;
  constructor(public confData: ConferenceData, public platform: Platform) {
  }

  ionViewDidLoad() {
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


    this.confData.getMap().subscribe((mapData: any) => {
      let mapEle = this.mapElement.nativeElement;

      let map = new google.maps.Map(mapEle, {
        center: mapData.find((d: any) => d.center),
        zoom: 16
      });


      mapData.forEach((markerData: any) => {
        let routes: any = []
        secao.forEach((sessao) => {
          sessao.rota.forEach((rota) => {
            if (rota == markerData.id) {
              routes.push(sessao)
            }
          })
        })
        let names: any
        routes.forEach((as) => {
          names = as.name
        }
        )

        let infoWindow = new google.maps.InfoWindow({
          content:
          `
          <h5>Endereço:${markerData.name}</h5>
          <p> linha: ${names} </p>
          `
        });

        let marker = new google.maps.Marker({
          position: markerData,
          map: map,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 4
          },
          draggable: true,
          title: markerData.name
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });

        // Evento que fecha a infoWindow com click no mapa
        google.maps.event.addListener(map, 'click', function () {
          infoWindow.close();
        });
      });

      google.maps.event.addListenerOnce(map, 'idle', () => {
        mapEle.classList.add('show-map');
      });


    });

  }
}
