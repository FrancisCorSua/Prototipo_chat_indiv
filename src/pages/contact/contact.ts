import { Component } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Profile } from '../../models/profile';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database-deprecated';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  profileData: FirebaseObjectObservable<Profile>;
  perfiles: any = [];
  myUid: any;

  constructor(private afAuth: AngularFireAuth, private toast: ToastController,
    private afDatabase: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillLoad() {
    this.afAuth.authState.take(1).subscribe(data => {
      this.myUid = data.uid;
      if (data && data.email && data.uid) {

        this.afDatabase.list('/profile').subscribe(items => {

          for (let i = 0; i < items.length; i++) {
            console.log(items[i].$key);
            if (items[i].$key != this.myUid) {
              this.perfiles.push(items[i]);
            }
          }
        })
      }
    })
  }

}
