import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthProvider } from '../../providers/auth/auth';
import { SignupPage } from '../../pages/signup/signup';
import { TabsPage } from '../../pages/tabs/tabs';
import { AlertController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { User } from '../../models/user';
import { HomePage } from '../home/home';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;
  email: any;
  password: any;
  error: any;
  signupPage = SignupPage;

  user = {} as User;

  constructor(private afDatabase: AngularFireDatabase, private toast: ToastController,
    private afAuth: AngularFireAuth, public navCtrl: NavController,
    public navParams: NavParams, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9!#$%&amp;amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;amp;'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });

    this.email = this.loginForm.controls['email'];
    this.password = this.loginForm.controls['password'];
  }

  async login(user: User) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.contrasena);
      if (result) {
        this.navCtrl.setRoot(TabsPage);
      }
    } catch (e) {
      console.error(e);
      if (this.user.email == null || this.user.contrasena == null ||
        this.user.email && this.user.contrasena == null) {
        this.toast.create({
          message: `Debe rellenar todos los campos`,
          duration: 3000
        }).present();
      }
    }
  }

  register() {
    this.navCtrl.push(SignupPage);
  }

}