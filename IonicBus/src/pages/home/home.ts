import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavController } from 'ionic-angular';

declare var google;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  way: any = [];
  mark: any = [];
  i:any;
  start = '-24.045622, -52.378038';
  end = '-24.060561, -52.387306';
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  constructor(public navCtrl: NavController) {
	this.way.push({location: "-24.046870, -52.379572",stopover: true});
	this.way.push({location: "-24.048407, -52.381630",stopover: true});
	this.way.push({location: "-24.050378, -52.384147",stopover: true});
	this.way.push({location: "-24.063271, -52.391533",stopover: true});
  }

  ionViewDidLoad(){
    this.initMap();
    this.calculateAndDisplayRoute();
  }

  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 12,
      center: {lat: -24.0741904,
              lng: -52.3809802}
    });
	this.directionsDisplay.setMap(this.map);
	/* Vou arrumar isso ainda
    // Now you can use all methods safely.
    this.mark.push(
		new google.maps.Marker({
			position: new google.maps.LatLng(-24.0741904,-52.3809802),
			title:"Hello World!"
		})
	);
	for(this.i=0;this.i<this.mark.length;this.i++){
		this.mark[this.i].setMap(this.map);
		
		this.mark[this.i].addListener('click', function() {
          
		  
        });
		console.log("Ponto:"+this.i+ " Titulo:" + this.mark[this.i].title +"Hora "+ Date() );
	}*/
  }

  calculateAndDisplayRoute() {
    this.directionsService.route({
      origin: this.start,
      destination: this.end,
	  waypoints: this.way,
	  travelMode: 'DRIVING',
	  provideRouteAlternatives: true
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
		console.log('Map is ready!');
      }
    });
  }

}