import { Component } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Profile } from '../../models/profile';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database-deprecated';

@Component({
  selector: 'page-ajustes-usuario',
  templateUrl: 'ajustes-usuario.html',
})
export class AjustesUsuarioPage {

  profileData: FirebaseObjectObservable<Profile>;

  constructor(private afAuth: AngularFireAuth, private toast: ToastController,
    private afDatabase: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillLoad() {
    this.afAuth.authState.take(1).subscribe(data => {
      if (data && data.email && data.uid) {
        this.toast.create({
          message: `Buenos días, ${data.email}`,
          duration: 3000
        }).present();

        this.profileData = this.afDatabase.object(`profile/${data.uid}`)
      }
      else {
        this.toast.create({
          message: `could not find authentification details.`,
          duration: 3000
        }).present();
      }
    })
  }
}
