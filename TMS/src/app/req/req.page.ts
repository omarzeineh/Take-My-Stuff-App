import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Router } from '@angular/router';
import { getDatabase, ref, set, push, remove, onValue, DataSnapshot, Database } from 'firebase/database';
import { post, requests } from 'src/app/posts/posts.page'
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-req',
  templateUrl: './req.page.html',
  styleUrls: ['./req.page.scss'],
})
export class ReqPage implements OnInit {


  uid: any;

  allrlist: any;

  constructor(private router:Router) {
    this.allrlist = []
   }

   getRequests() {
    const db = getDatabase();
    const Ref = ref(db, 'requests')
    onValue(Ref, (data) => {this.handlerData3(data)} )
  }
  
  handlerData3(data: DataSnapshot) {
    this.allrlist = []
    data.forEach((ITEM) => {this.handlerData4(ITEM)})
  }
  
  handlerData4(data: any){
    const Key = data.key
    const item = data.val()
  
    this.allrlist.push(new requests(item.title, item.typee, item.description, item.a_times, item.av, Key, item.uid))
  }


  ngOnInit() {
    onAuthStateChanged(getAuth(), (user) => {
      if(user) {
        this.uid = user.uid
        console.log(this.uid)
      }
      else{
        this.router.navigate(['/home'])
      }})
    this.getRequests()
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
   sigOut() {
    signOut(getAuth())
    this.router.navigate([''])
  }
}
