import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Router } from '@angular/router';
import {getDatabase, ref, set, push, remove, onValue, DataSnapshot, Database} from 'firebase/database';

export class post {
  static Itypes: string[] = ['Desk' , 'Table' , 'Kitechen Applaiance' , 'Bed' , 'Shelf' , 'Drawer' , 'Closet' , 'Sofa', 'Chair']
  title: any;
  typee: string;
  description: string;
  a_times: string[];
  av: any;
  lat: number;
  lng: number;
  base64im: any;
  key: any;
  uid: any;

  constructor(ti: any, t: string, d: string, a: string[], la: any, ln: any, im: any, av: boolean, key:any, uid: any) {
    this.title = ti;
    this.typee = t;
    this.description = d;
    this.a_times = a;
    this.lat = la
    this.lng = ln
    this.base64im = im;
    this.av = av;
    this.key = key;
    this.uid = uid;
   }
}

export class requests {
  static Itypes: string[] = ['Desk' , 'Table' , 'Kitechen Applaiance' , 'Bed' , 'Shelf' , 'Drawer' , 'Closet' , 'Sofa', 'Chair']
  title: any;
  typee: string;
  description: string;
  key: any;
  a_times: any;
  av: any;
  uid: any;

  constructor(ti: any, t: string, d: string, a:any, av: any, key:any, uid: any) {
    this.title = ti;
    this.typee = t;
    this.description = d;
    this.key = key;
    this.a_times = a;
    this.av = av;
    this.uid = uid
   }
}

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {

  uid: any;

  plist: any;

  constructor(private router:Router) { }

  uploadpost() {

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

  getPosts() {
    const db = getDatabase();
    const Ref = ref(db, 'posts')
    onValue(Ref, (data) => {this.handleData(data)} )
  }

  handleData(data: DataSnapshot) {
    this.plist = []
    data.forEach((ITEM) => {this.handleDataI(ITEM)})
  }

  handleDataI(data: any){
    const Key = data.key
    const item = data.val()
    console.log(Key)

    this.plist.push(new post(item.title, item.typee, item.description, item.a_times, item.lat, item.lng, item.base64im, item.av, Key, item.uid))
    console.log(this.plist)

  }

  onMap(Item: post) {
    const db = getDatabase();
    set(ref(db, this.uid+"lat"), Item.lat);
    set(ref(db, this.uid+"lng"), Item.lng);
    this.router.navigate(['/mapp']);
  }

  sigOut() {
    signOut(getAuth())
    this.router.navigate([''])
  }

  book(item: post) {
    if(item.uid != this.uid) {
    const db = getDatabase();
    let object  = new post(item.title, item.typee, item.description, item.a_times, item.lat, item.lng, item.base64im, false, item.key, item.uid)
    set(ref(db, 'posts/'+item.key), object)
    push(ref(db, 'book/'+this.uid), object)
    this.getPosts()
    }
    else {
      console.log("You Cannot Book Your Items")
    }
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
    this.getPosts()

  }

}
