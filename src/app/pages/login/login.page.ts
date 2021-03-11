import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { NavController, MenuController, Platform } from '@ionic/angular';
import * as firebase from 'firebase';
import { AuthService } from 'src/app/services/auth.service';
import { ErroresService } from 'src/app/services/errores.service';
import { Plugins } from '@capacitor/core';
const { FacebookLogin } = Plugins;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  constructor(private loginService: AuthService,
              private navCtrl: NavController,
              private erroresService: ErroresService,
              public ngFireAuth: AngularFireAuth,
              private googleplus: GooglePlus,
              private menuCtrl: MenuController,
              private platform: Platform) 
  {
    firebase.default.auth().onAuthStateChanged( user => {
      if (user){
        this.loginService.SetUserData(user).then(()=> {
          if (!this.menuCtrl.isEnabled('first')){
            this.menuCtrl.enable(true, 'first');
          }
          this.navCtrl.navigateRoot('/tabs');
          this.erroresService.cerrarAlerta();
        });
      } 
    });
  }

iniciarSesionConFacebook() {
  this.erroresService.mostrarCargando();
  const FACEBOOK_PERMISSIONS = ['email'];
  return FacebookLogin.login({ permissions: FACEBOOK_PERMISSIONS }).then( async response => {
    const result = await FacebookLogin.getCurrentAccessToken();
    const facebookCredential = firebase.default.auth.FacebookAuthProvider
    .credential(result.accessToken.token);
    firebase.default.auth().signInWithCredential(facebookCredential)
    .then( success => {})
    .catch((error) => { 
      this.erroresService.mostrarError(error); 
    });;
  }).catch((error) => { 
    this.erroresService.mostrarError(error); 
  });
}

async iniciarSesionConGoogle() {
  this.erroresService.mostrarCargando();
  let webClientId: string = '';
  if (this.platform.is('ios')){
    webClientId:'1063951960415-fkoarn3uhqsmdi0a21095fk1430aue6t.apps.googleusercontent.com'
  }else{
    webClientId:'1063951960415-fkoarn3uhqsmdi0a21095fk1430aue6t.apps.googleusercontent.com'
  }
  this.googleplus.login({'webClientId': webClientId, 'offline': true})
    .then( res => {
      firebase.default.auth().signInWithCredential(firebase.default.auth.GoogleAuthProvider.credential(res.idToken))
        .then( success => {})
        .catch( error => this.erroresService.mostrarError(JSON.stringify(error)));
    }).catch(err => this.erroresService.mostrarError(err));
  }
}

