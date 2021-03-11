import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ErroresService } from 'src/app/services/errores.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.page.html',
  styleUrls: ['./iniciar-sesion.page.scss'],
})
export class IniciarSesionPage implements OnInit {

  constructor(private loginService: AuthService,
    private navCtrl: NavController,
    private erroresService: ErroresService) { }

  ngOnInit() {
  }

  iniciarSesion(correo: string, clave: string, nombreUsuario: string) {
    this.erroresService.mostrarCargando();
    this.loginService.SignIn(correo,clave).then(data => {
      this.loginService.SetUserData(data.user).then(data2 => {
        console.log(data2)
        this.navCtrl.navigateRoot('tabs')
        this.erroresService.cerrarAlerta();
      })
      
    })
    .catch(err => {
      this.erroresService.cerrarAlerta();
      this.erroresService.mostrarError(err.code)
      console.log(err)
    })
    .finally(()=> {
    })
  }

}
