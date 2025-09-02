import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Router } from '@angular/router';
import {getDatabase, ref, set, push, remove, onValue, DataSnapshot, Database} from 'firebase/database';
import { post, requests } from 'src/app/posts/posts.page'


declare var google: any;

@Component({
  selector: 'app-mapp',
  templateUrl: './mapp.page.html',
  styleUrls: ['./mapp.page.scss'],
})
export class MappPage implements OnInit {

  uid: any;

  ulat: any;
  ulng: any;

  ilat: any;
  ilng: any;

  map: any;
  mapElementRef: any;

  service: any;

  display: any;


  constructor(private router:Router) {
    this.display = new google.maps.DirectionsRenderer();

   }

  async getPosition()
  {
    const coordinates = await Geolocation.getCurrentPosition();
    this.ulat = coordinates.coords.latitude;
    this.ulng = coordinates.coords.longitude;
  }

  async loadMap() {
    await this.getPosition();
    await this.getItemLocation() 
    console.log(this.ilat)
    console.log(this.ilng)
    let mapOptions = {
    //centered at user current position
    center: { lat: this.ulat, lng: this.ulng },
    zoom: 15,
    //ROADMAP to get the direction
    mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.mapElementRef = document.getElementById('map');
    this.map = new google.maps.Map(this.mapElementRef, mapOptions);
    let marker = this.addMarker(this.ulat, this.ulng, "My Location");
    this.drawRoute(this.ulat, this.ulng, this.ilat, this.ilng)
  }

  getItemLocation() {
    const db = getDatabase();
    onValue(ref(db, this.uid + "lat"), (data) => {if(data.val()!=null) {this.ilat = data.val()}})
    onValue(ref(db, this.uid + "lng"), (data) => {if(data.val()!=null) {this.ilng = data.val()}})
  
  }


  addMarker(latitude: number, longitude: number, placeName:string) {
    const marker = new google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map: this.map
      });
    return marker;
  }

  drawRoute(startLat: number, startLng: number, endLat: number, endLng: number)
{
  let service = new google.maps.DirectionsService();
  this.display.setMap(this.map);
  let request = {
    origin: {lat: startLat, lng: startLng},
    destination: {lat: endLat, lng: endLng},
    travelMode: google.maps.TravelMode.DRIVING,
  };
  service.route(request, (result: any, status: any) => {
    if (status == 'OK') {
      this.display.setDirections(result);
    }
  });
}
navipost() {
  this.router.navigate(['/posts'])
 }
  ngOnInit() {
    onAuthStateChanged(getAuth(), (user) => {
      if(user) {
        this.uid = user.uid
        this.loadMap()
      }})
  }

}
