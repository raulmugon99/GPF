import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verificar-correo',
  templateUrl: './verificar-correo.page.html',
  styleUrls: ['./verificar-correo.page.scss'],
})
export class VerificarCorreoPage implements OnInit {

  constructor(private loginService: AuthService,
    private navCtrl: NavController) { }

async ngOnInit() {
setInterval(async () => {
await firebase.default.auth().currentUser.reload();
var user = firebase.default.auth().currentUser;
if (user.emailVerified) {
localStorage.setItem('user', JSON.stringify(user));
this.navCtrl.navigateRoot('/tabs')
} 
}, 1000);
}

}