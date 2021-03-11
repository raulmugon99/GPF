import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { MenuController, Platform } from '@ionic/angular';
import * as firebase from 'firebase';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: User;
  constructor(public afStore: AngularFirestore,
              public ngFireAuth: AngularFireAuth,
              public router: Router,
              private menuController: MenuController ) {
                this.ngFireAuth.authState.subscribe(user => {
                  if (user) {
                    this.userData = user;
                    localStorage.setItem('user', JSON.stringify(this.userData));
                    JSON.parse(localStorage.getItem('user'));
                  } else {
                    localStorage.setItem('user', null);
                    JSON.parse(localStorage.getItem('user'));
                  }
                });
              }

  SignInGoogle() {
    const provider = new firebase.default.auth.GoogleAuthProvider();
    return this.socialSignIn(provider.providerId);
  }

  obtenerIDAleatorio() {
    return this.afStore.createId();
  }
  SignInFacebook() {
    const provider = new firebase.default.auth.FacebookAuthProvider();
    return this.socialSignIn(provider.providerId);
  }

  // Login in with email/password
  SignIn(email, password) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }

  // Register user with email/password
  RegisterUser(email, password) {
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password);
  }

  // Email verification when new user register
  async SendVerificationMail() {
    (await this.ngFireAuth.currentUser).sendEmailVerification().then(() => {
      this.router.navigate(['/correo/registro/verificar']);
  });
  }

  // Recover password
  PasswordRecover(passwordResetEmail) {
    return this.ngFireAuth.sendPasswordResetEmail(passwordResetEmail);
  }

  // Devuelve true si el usuario esta logeado
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user !== null && user.emailVerified !== false) {
      return true;
    } else if (user !== null && user.emailVerified === false && user.providerData[0].providerId==='facebook.com') {
      return true;
    }else{
      return false;
    }
  }

  // Devuelve verdadero si el usuario tiene el correo verificado
  get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user.emailVerified !== false) ? true : false;
  }

  // Guarda el usuario en localstorage
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  // Sign-out
  SignOut() {
    return this.ngFireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
      this.menuController.enable(false, 'first');
    });
  }

  async socialSignIn(providerName: string){
    const provider = new firebase.default.auth.OAuthProvider(providerName);
    const result = await this.ngFireAuth.signInWithRedirect(provider)
    return result;
  }
}
