import { Component } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Profile } from '../../models/profile';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  profileData: FirebaseObjectObservable<Profile>;

  myUserName: any;
  constructor(private afAuth: AngularFireAuth, private toast: ToastController,
    private afDatabase: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams,
    public myAuth: AuthProvider
    ) {
  }

  ionViewWillLoad() {
    // this.probarSiMuestraUserName();

    this.myAuth.getUser().subscribe(data => {
      console.log("en el home");
      console.log(data);
    });
    
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
    });
  }

  // probarSiMuestraUserName(){
  //   let usuario = this.myAuth.getCurrentUserData();
  //     console.log(usuario);
  //     console.log(usuario.nombreDeUsuario);
    
  // }
}
