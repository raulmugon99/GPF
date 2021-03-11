import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController, NavController } from '@ionic/angular';
import { CrearEventoPage } from 'src/app/pages/eventos/crear-evento/crear-evento.page';
import { AuthService } from 'src/app/services/auth.service';
// import { ConfiguracionPage } from 'src/app/pages/configuracion/configuracion.page';
// import { CrearEventoPage } from 'src/app/pages/crear-evento/crear-evento.page';
// import { AuthService } from 'src/app/services/auth.service';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  constructor(private menuCtrl: MenuController,
              public eventosService: EventosService,
              public authService: AuthService,
              private modalCtrl: ModalController,
              private navCtrl: NavController) { }

  cerrarSesion() {
    this.authService.SignOut();
    this.menuCtrl.close();
  }

  crear() {
    this.menuCtrl.close();
    this.mostrarModalCrearEvento();
  }

  cerrarMenu() {
    this.menuCtrl.close();
  }

  async abrirConfiguracion() {
    this.navCtrl.navigateForward('ajustes');
    this.cerrarMenu();
  }

  async mostrarModalCrearEvento() {
    const modal = await this.modalCtrl.create({
      component: CrearEventoPage,
      cssClass: 'modal-crear-evento',
      swipeToClose: true,
    });
    return await modal.present();
  }
}
