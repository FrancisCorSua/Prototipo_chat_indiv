import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { RoomPage } from '../room/room';
import * as firebase from 'firebase';
import { AuthProvider } from '../../providers/auth/auth';
/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  @ViewChild(Content) content: Content;
  data = { type: '', nickname: '', message: '' };
  chats = [];
  roomkey: string;
  nickname: string;
  offStatus: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public myAuth: AuthProvider) {
    this.roomkey = this.navParams.get("key") as string;
    this.nickname = this.navParams.get("nickname") as string;
    this.data.type = 'message';
    this.data.nickname = this.nickname;

    let joinData = firebase.database().ref('chatrooms/' + this.roomkey + '/chats').push();
    this.myAuth.getUser().subscribe(data => {
      console.log("en el home");
      console.log(data);
      this.nickname = data.nombreDeUsuario;

      joinData.set({
        type: 'join',
        user: this.nickname,
        message: this.nickname + ' ha entrado en este chat',
        sendDate: Date()
      });
    });

    firebase.database().ref('chatrooms/' + this.roomkey + '/chats').on('value', resp => {
      this.chats = [];
      this.chats = snapshotToArray(resp);
      setTimeout(() => {
        if (this.offStatus === false) {
          this.content.scrollToBottom(300);
        }
      }, 1000
      );
    });
    //   firebase.database().ref('chatrooms/' + this.roomkey + '/chats').on('value', resp => {
    //     this.chats = [];
    //     this.chats = snapshotToArray(resp);
    //     this.myAuth.getUser().subscribe(data => {
    //       console.log("en el home");
    //       console.log(data);
    //     setTimeout(() => {
    //       if (this.offStatus === false) {
    //         this.content.scrollToBottom(300);
    //       }
    //     }, 1000
    //     );
    //   });
    // }
  }

  sendMessage() {
    let newData = firebase.database().ref('chatrooms/' + this.roomkey + '/chats').push();
    this.myAuth.getUser().subscribe(data => {
      console.log("en el home");
      console.log(data);
      this.nickname = data.nombreDeUsuario;
      newData.set({
        type: this.data.type,
        user: this.nickname,
        message: this.data.message,
        sendDate: Date()

      });
      this.data.message = '';
    });

  }

  exitChat() {
    this.offStatus = true;

    this.navCtrl.setRoot(RoomPage, {
      nickname: this.nickname
    });
  }

  // abandonarChat() {
  //   let exitData = firebase.database().ref('chatrooms/' + this.roomkey + '/chats').push();
  //   this.myAuth.getUser().subscribe(data => {
  //     console.log("en el home");
  //     console.log(data);
  //     this.nickname = data.nombreDeUsuario;
  //     exitData.set({
  //       type: 'exit',
  //       user: this.nickname,
  //       message: this.nickname + ' ha salido del chat',
  //       sendDate: Date()
  //     });
  //     this.offStatus = true;
  //   });


  //   this.navCtrl.setRoot(RoomPage, {
  //     nickname: this.nickname
  //   });
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
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