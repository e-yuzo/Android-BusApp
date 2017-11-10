import { Component, ViewChild, ElementRef } from '@angular/core';

import { ConferenceData } from '../../providers/conference-data';

import { Platform } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';

declare var google: any;


@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('mapCanvas') mapElement: ElementRef;
  constructor(
    public confData: ConferenceData, 
    public platform: Platform, 
    public geolocation: Geolocation) {
  }

  ionViewDidLoad() {

    let markerUser;
    this.confData.getMap().subscribe((mapData: any) => {

      let mapEle = this.mapElement.nativeElement;
      let map;

      this.geolocation.getCurrentPosition().then(position => {

        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        console.log(position.coords.latitude+','+position.coords.longitude);
        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
        }

        map = new google.maps.Map(mapEle, mapOptions);

        markerUser = new google.maps.Marker({ //user maker for gps
          map: map,
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
          infoWindowUser.open(map, markerUser);
        });

        mapData.forEach((markerData: any) => {
          let infoWindow = new google.maps.InfoWindow({
            content: `<h5>${markerData.name}</h5>`
          });
          let marker = new google.maps.Marker({
            position: markerData,
            map: map,
            title: markerData.name,
            animation: google.maps.Animation.DROP,
          });
          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });
        });

        google.maps.event.addListener(map, 'idle', () => {
          mapEle.classList.add('show-map');
        });
      }, (err) => {
        console.log(err);
      });
      this.geolocation.watchPosition().subscribe(position => {
        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        // set marker position
        markerUser.setPosition(latLng);
      });
    });
  }
}