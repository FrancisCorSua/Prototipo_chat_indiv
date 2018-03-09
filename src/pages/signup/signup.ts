import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  signupForm: FormGroup;
  email: AbstractControl;
  password: AbstractControl;
  error: any;

  user = {} as User;

  constructor(private fb: FormBuilder, private toast: ToastController,
    private afAuth: AngularFireAuth, public navCtrl: NavController,
    public navParams: NavParams) {
    this.signupForm = this.fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9!#$%&amp;amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;amp;'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });

    this.email = this.signupForm.controls['email'];
    this.password = this.signupForm.controls['password'];
  }
  async register(user: User) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email,
        user.contrasena);
      console.log(result);
      this.navCtrl.setRoot(ProfilePage);
    } catch (e) {
      console.error(e);
      if (user.email == null || user.contrasena == null || user.email && user.contrasena == null) {
        this.toast.create({
          message: `Debe rellenar todos los campos`,
          duration: 3000
        }).present();
      }
      if(user.email && user.contrasena != null && user.contrasena.length < 6){
        this.toast.create({
          message: `La contraseña debe tener al menos 6 caracteres`,
          duration: 3000
        }).present();
      }
      if (user.email && user.contrasena != null && user.contrasena.length >= 6) {
        this.toast.create({
          message: `Ese email está en uso`,
          duration: 3000
        }).present();
      }
    }
  }
  goback() {
    this.navCtrl.pop();
  }
}