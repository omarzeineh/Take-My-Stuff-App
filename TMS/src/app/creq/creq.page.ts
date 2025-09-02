import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Router } from '@angular/router';
import { getDatabase, ref, set, push, remove, onValue, DataSnapshot, Database } from 'firebase/database';
import { post, requests } from 'src/app/posts/posts.page'
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-creq',
  templateUrl: './creq.page.html',
  styleUrls: ['./creq.page.scss'],
})
export class CreqPage implements OnInit {

  uid: any;

  t: any;

  rTitle: any;
  rType: any;
  rdesc: any;
  rtime: any;

  rlist: any;

  constructor(private router:Router) {
    this.t = post.Itypes
    this.rlist = []
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
   createRequest() {
    if(this.rlist.length < 3) {
      let object = new requests(this.rTitle, this.rType, this.rdesc, this.rtime, true, '', this.uid);
      const db = getDatabase();
      push(ref(db, 'requests'), object);
      push(ref(db, "r" + this.uid), object);
      this.navimy()
    }
    else {
      console.log("Max Number Of Requests Reached")
    }
}

getMyRequests() {
  onAuthStateChanged(getAuth(), (user) => {
    if(user) {
      this.uid = user.uid
      const db = getDatabase();
      console.log("r" + this.uid)
      const Ref = ref(db, "r" + this.uid)
      onValue(Ref, (data) => {this.handlerData(data); console.log(this.rlist)} )
    }
    else{
      this.router.navigate(['/home'])
    }})
}

handlerData(data: DataSnapshot) {
  this.rlist = []
  data.forEach((ITEM) => {this.handlerData2(ITEM)})
}

handlerData2(data: any){
  const Key = data.key
  const item = data.val()

  this.rlist.push(new requests(item.title, item.typee, item.description, item.a_times, item.av, Key, item.uid))
}

  ngOnInit() {
    this.getMyRequests();
  }

}
