import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { AdmobService } from 'src/app/services/admob.service';
import { AuthService } from 'src/app/services/auth.service';
import { ConfiguracionService } from 'src/app/services/configuracion.service';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
})
export class AjustesPage implements OnInit {

  constructor(private navCtrl: NavController,
    public authService: AuthService,
    private menuCtrl: MenuController,
    public admobService: AdmobService,
    public configuracionService: ConfiguracionService) { }

ngOnInit() {

}

async mostrarPantallacambiarNombreUsuario() {
this.navCtrl.navigateForward('configuracion/cambiar-usuario');
}

cerrarModal() {
this.navCtrl.navigateRoot('tabs/inicio');
}
cerrarSesion() {
this.authService.SignOut();
this.menuCtrl.close();
}
//FUNCION PARA LLAMAR AL VIDEOREWARD
async MostrarRewardPersona(cantidadAnterior: number){
console.log(cantidadAnterior)
this.admobService.ShowRewardVideo('P',cantidadAnterior);
}

async MostrarRewardRegalo(cantidadAnterior: number){
this.admobService.ShowRewardVideo('R',cantidadAnterior);
}
}

