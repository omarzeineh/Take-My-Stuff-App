import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Router } from '@angular/router';
import { getDatabase, ref, set, push, remove, onValue, DataSnapshot, Database } from 'firebase/database';
import { post, requests } from 'src/app/posts/posts.page'
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-my',
  templateUrl: './my.page.html',
  styleUrls: ['./my.page.scss'],
})
export class MyPage implements OnInit {

  plist: any;
  allplist: any;

  uid: any;

  t: any;

  rlist: any;
  allrlist: any;

  booked: any;
  bookings: any;

  constructor(private router:Router) {
    this.t = post.Itypes
    this.rlist = []
    this.plist = []
    this.allrlist = []
    this.allplist = []
    this.booked = []
    this.bookings = []
   }


   naviCP() {
    this.router.navigate(['/cpost'])
   }

   naviCR() {
    this.router.navigate(['/creq'])
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

    this.plist.push(new post(item.title, item.typee, item.description, item.a_times, item.lat, item.lng, item.base64im, item.av, Key, item.uid))
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

  getBookedPosts() {
    const db = getDatabase();
    const Ref = ref(db, 'book')
    onValue(Ref, (data) => {this.handleDataa(data)})
  }

  async handleDataa(data: DataSnapshot) {
    this.booked = []
    await data.forEach((ITEM) => {this.handleDataa2(ITEM)})
      console.log(this.booked)
  }

  async handleDataa2(data: any){
    const Key = data.key
    await data.forEach((data: any) => {this.handleDataa3(data)})
    this.booked.forEach((item:any) => {
      for(let i =0; i < this.plist.length; i++) {
        if((this.plist[i].title == item.title) && (this.plist[i].typee == item.typee) && (this.plist[i].description == item.description)) {
          this.plist[i].av = false;
        }
      }
    })
  }

  handleDataa3(data: any) {
    const Key = data.key
    const item = data.val()
    if(item.uid == this.uid) {
      this.booked.push(new post(item.title, item.typee, item.description, item.a_times, item.la, item.ln, item.base64im, item.av, Key, item.uid))
      }
  }

  getMyBookings() {
    onAuthStateChanged(getAuth(), (user) => {
      if(user) {
        this.uid = user.uid
        const db = getDatabase();
        const Ref = ref(db, 'book/'+this.uid)
        this.bookings = []
        onValue(Ref, (data) => {this.handleDataaa4(data)})
      }})
  }

  handleDataaa4(data:DataSnapshot) {
    const Key = data.key
    data.forEach((item) => {this.handleDataaa5(item)})
  }

  handleDataaa5(data: any) {
    const Key = data.key
    const item = data.val()
    console.log(item)
    this.bookings.push(new post(item.title, item.typee, item.description, item.a_times, item.lat, item.lng, item.base64im, item.av, item.key, item.uid))
  }


  removeItemFromList(item:post) {
    let index: number = this.plist.indexOf(item);
    this.plist.splice(index,1)
    const db = getDatabase();

    remove(ref(db, this.uid+'/'+item.key))
   for(let j = 0; j < this.allplist.length; j++) {
      if((item.title == this.allplist[j].title) && (item.typee == this.allplist[j].typee)  && (item.a_times == this.allplist[j].a_times) && (item.description == this.allplist[j].description) && (item.uid == this.allplist[j].uid))
      {
        item = this.allplist[j]
        break;
      }
    }

    let index2: number = this.allplist.indexOf(item);
    this.allplist.splice(index2,1)

    remove(ref(db, 'posts/'+item.key))
  }

  unbook(item: post) {
    const db = getDatabase();
    let object  = new post(item.title, item.typee, item.description, item.a_times, item.lat, item.lng, item.base64im, true, item.key, item.uid)
    set(ref(db, 'posts/'+item.key), object)

    let index: number = this.bookings.indexOf(item);
    this.bookings.splice(index,1)
    remove(ref(db, 'book/'+this.uid))
  }

    
  onMap(Item: post) {
    const db = getDatabase();
    set(ref(db, this.uid+"lat"), Item.lat);
    set(ref(db, this.uid+"lng"), Item.lng);
    this.router.navigate(['/mapp']);
  }

getMyRequests() {
  onAuthStateChanged(getAuth(), (user) => {
    if(user) {
      this.uid = user.uid
      const db = getDatabase();
      console.log("r" + this.uid)
      const Ref = ref(db, "r" + this.uid)
      onValue(Ref, (data) => {this.handlerData(data); console.log(this.rlist)} )
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

removeRequest(item:any) {
  let index: number = this.rlist.indexOf(item);
  this.rlist.splice(index,1)
  const db = getDatabase();
  remove(ref(db, "r"+this.uid+'/'+item.key))

  for(let j = 0; j < this.allrlist.length; j++) {
    if((item.title == this.allrlist[j].title) && (item.typee == this.allrlist[j].typee) && (item.description == this.allrlist[j].description) && (item.uid == this.allrlist[j].uid))
      {
        item = this.allrlist[j]
      }
  }

  let index2: number = this.allrlist.indexOf(item);
  this.allrlist.splice(index2,1)

  remove(ref(db, 'requests/'+item.key))
}

sigOut() {
  signOut(getAuth())
  this.router.navigate(['/home'])
}


  ngOnInit() {
    onAuthStateChanged(getAuth(), (user) => {
      if(user) {
        this.uid = user.uid
      }
      else{
        this.router.navigate(['/home'])
      }})
    this.getMyPosts();
    this.getPosts();
    this.getRequests();
    this.getMyRequests();
    this.getBookedPosts();
    this.getMyBookings()
    }

}
