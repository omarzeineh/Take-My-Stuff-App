import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Router } from '@angular/router';
import { getDatabase, ref, set, push, remove, onValue, DataSnapshot, Database } from 'firebase/database';
import { post, requests } from 'src/app/posts/posts.page'
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType } from '@capacitor/camera';


@Component({
  selector: 'app-cpost',
  templateUrl: './cpost.page.html',
  styleUrls: ['./cpost.page.scss'],
})
export class CpostPage implements OnInit {

  Title: any;
  Type: any;
  desc: any;
  time: any;
  lat: any;
  lng: any;
  base64im: any;

  plist: any;

  uid: any;

  t: any;

  constructor(private router:Router) {
    this.t = post.Itypes
    this.plist = []
   }
   navimy() {
    this.router.navigate(['/my'])
  }
  navipost() {
    this.router.navigate(['/posts'])
   }
   navireq() {
   this.router.navigate(['/req'])
   }
   navinotify() {
    this.router.navigate(['/noti'])
   }
  createPost() {

    if(this.plist.length < 3) {
      let object = new post(this.Title, this.Type, this.desc, this.time, this.lat, this.lng, this.base64im, true, '', this.uid);
      const db = getDatabase();
      push(ref(db, 'posts'), object);
      push(ref(db, this.uid), object);
      this.navimy()
    }
    else {
      console.log("Max Number Of Posts Reached")
    }
  }

  async getPosition() {
    const cords = await Geolocation.getCurrentPosition()
    this.lat = cords.coords.latitude
    this.lng = cords.coords.longitude
   }

  async takepic() {
      let im = await Camera.getPhoto({
        quality:90,
        allowEditing:false,
        resultType:CameraResultType.Base64
        });
      this.base64im = 'data:image/jpeg;base64,'+ im.base64String;
   }

   getMyPosts() {
    onAuthStateChanged(getAuth(), (user) => {
      if(user) {
        this.uid = user.uid
      }})
    const db = getDatabase();
    console.log(this.uid)
    const Ref = ref(db, this.uid)
    onValue(Ref, (data) => {this.handleData(data); console.log(this.plist)} )
  }

  handleData(data: DataSnapshot) {
    this.plist = []
    data.forEach((ITEM) => {this.handleDataI(ITEM)})
  }

  handleDataI(data: any){
    const Key = data.key
    const item = data

    if(Key == this.uid) {
      item.forEach((it: any) => {this.handleData2(it)})
    }

  }

  handleData2(data: any) {
    const Key = data.key
    const item = data.val()

    this.plist.push(new post(item.title, item.typee, item.description, item.a_times, item.la, item.ln, item.base64im, item.av, Key, item.uid))
  }

  ngOnInit() {
    onAuthStateChanged(getAuth(), (user) => {
      if(user) {
        this.uid = user.uid
      }
      else{
        this.router.navigate(['/home'])
      }})
    this.getMyPosts()
    this.getPosition()
  }

}
