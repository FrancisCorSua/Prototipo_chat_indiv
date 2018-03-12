import { Component } from '@angular/core';
<<<<<<< HEAD
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
=======
import { IonicPage, NavController, NavParams } from 'ionic-angular';
>>>>>>> 34f31c7246b741558fecb260c1b5c835eee34970
import { AddRoomPage } from '../add-room/add-room';
import { ChatPage } from '../chat/chat';
import * as firebase from 'firebase';
/**
 * Generated class for the RoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-room',
  templateUrl: 'room.html',
})
export class RoomPage {
  rooms = [];
<<<<<<< HEAD
  ref = firebase.database().ref('chatrooms/');
  salir: boolean = false;
  nickname: string = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.ref.on('value', resp => {
      this.rooms = [];
      this.rooms = snapshotToArray(resp);
      this.salir = this.navParams.get("salir") as boolean;
      this.nickname = this.navParams.get("nickname") as string;
=======
  ref = firebase.database().ref('chatrooms/')
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.ref.on('value', resp => {
      this.rooms = [];
      this.rooms = snapshotToArray(resp);
>>>>>>> 34f31c7246b741558fecb260c1b5c835eee34970
    });
  }

  addRoom() {
    this.navCtrl.push(AddRoomPage);
  }
<<<<<<< HEAD

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Usted ya no pertenece a este grupo',
      //subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
      buttons: ['OK']
    });
    alert.present();
  }

  deleteRoom(key) {
    let newref = firebase.database().ref("chatrooms");
    newref.remove(key);
  }

  joinRoom(key) {
    if (this.salir) {
      this.showAlert();

    } else {
      this.navCtrl.setRoot(ChatPage, {
        key: key,
        nickname: this.navParams.get("nickname")
      });
    }

=======
  joinRoom(key) {
    this.navCtrl.setRoot(ChatPage, {
      key: key,
      nickname: this.navParams.get("nickname")
    });
>>>>>>> 34f31c7246b741558fecb260c1b5c835eee34970
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomPage');
  }


}
//convertir la respuesta de Firebase a una matriz.
export const snapshotToArray = snaphot => {
  let returnArr = [];

  snaphot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);

  });
  return returnArr;
}