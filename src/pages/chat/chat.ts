import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, AlertController } from 'ionic-angular';
import { RoomPage } from '../room/room';
import * as firebase from 'firebase';
import { AuthProvider } from '../../providers/auth/auth';
import { TabsPage } from '../tabs/tabs';
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
  salir: boolean = false;
  constructor(public alerCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public myAuth: AuthProvider) {
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

  doConfirm() {
    let confirm = this.alerCtrl.create({

      message: 'Desea abandonar el chat',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
            this.navCtrl.setRoot(TabsPage, {

              nickname: this.navParams.get("nickname")
            });
            this.offStatus = true;
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Agree clicked');
            let exitData = firebase.database().ref('chatrooms/' + this.roomkey + '/chats').push();
            this.myAuth.getUser().subscribe(data => {
              console.log("en el home");
              console.log(data);
              this.nickname = data.nombreDeUsuario;
              exitData.set({
                type: 'exit',
                user: this.nickname,
                message: this.nickname + ' ha salido del chat',
                sendDate: Date()
              });
              this.offStatus = true;
            });
            this.salir = true;
            this.navCtrl.setRoot(RoomPage, {
              nickname: this.nickname,
              salir: this.salir

            });

          }
        }
      ]
    });
    confirm.present()
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