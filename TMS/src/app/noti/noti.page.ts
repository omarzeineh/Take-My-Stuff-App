import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Router } from '@angular/router';
import { getDatabase, ref, set, push, remove, onValue, DataSnapshot, Database } from 'firebase/database';
import { post, requests } from 'src/app/posts/posts.page'
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-noti',
  templateUrl: './noti.page.html',
  styleUrls: ['./noti.page.scss'],
})
export class NotiPage implements OnInit {

  uid:any;

  allplist: any;

  rlist: any;

  reclist: any;

  constructor(private router:Router) {
    this.allplist = []
    this.reclist = []
    this.rlist = []
   }

  async ngOnInit() {
    onAuthStateChanged(getAuth(), (user) => {
      if(user) {
        this.uid = user.uid
        this.getPosts()
        this.getMyRequests()
      }
      else{
        this.router.navigate(['/home'])
      }})
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

 getPosts() {
    const db = getDatabase();
    const Ref = ref(db, 'posts')
    onValue(Ref, (data) => {this.handleData3(data)} )
  }

  handleData3(data: DataSnapshot) {
    this.allplist = []
    data.forEach((ITEM) => {this.handleData4(ITEM)})
  }

  handleData4(data: any){
    const Key = data.key
    const item = data.val()

    this.allplist.push(new post(item.title, item.typee, item.description, item.a_times, item.la, item.ln, item.base64im, item.av, Key, item.uid))
  }

    getMyRequests() {
      onAuthStateChanged(getAuth(), (user) => {
      if(user) {
        this.uid = user.uid
        const db = getDatabase();
        console.log("r" + this.uid)
        const Ref = ref(db, "r" + this.uid)
        onValue(Ref, (data) => {this.handlerData(data); console.log(this.rlist)
          this.rlist.forEach((req: requests) => {
          console.log(req)
          for(let i = 0; i < this.allplist.length; i++) {
            let inn = false;
            for(let j = 0; i < this.reclist.length; i++) {
              if(this.reclist[j] == this.allplist[i]) {
                inn = true
              }
            }
            if((req.typee == this.allplist[i].typee) && (!inn) && (req.uid != this.allplist[i].uid)) {
              this.reclist.push(this.allplist[i])
            }
          }
        })} )
        
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

}
