import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
  ref = firebase.database().ref('chatrooms/');
  salir = false;
  nickname: string = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.salir = this.navParams.get("salir") as boolean;
    this.ref.on('value', resp => {
      this.rooms = [];
      this.rooms = snapshotToArray(resp);
      this.nickname = this.navParams.get("nickname") as string;
    });
  }

  addRoom() {
    this.navCtrl.push(AddRoomPage);
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Usted ya no pertenece a este grupo',

      buttons: ['OK']
    });
    alert.present();
  }

  deleteRoom(key) {
    let newref = firebase.database().ref("chatrooms").child(key);
    newref.remove();
  }

  joinRoom(key) {
    if (this.salir) {
      this.showAlert();

    } else {
      this.salir = false;
      this.navCtrl.setRoot(ChatPage, {
        key: key,
        nickname: this.navParams.get("nickname"),
        salir: this.salir
      });
    }


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