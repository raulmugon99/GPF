import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MostrarProductoListaComponent } from 'src/app/components/mostrar-producto-lista/mostrar-producto-lista.component';
import { EventosService } from 'src/app/services/eventos.service';
import { CrearProductoPage } from './crear-producto/crear-producto.page';

@Component({
  selector: 'app-lista-deseos',
  templateUrl: './lista-deseos.page.html',
  styleUrls: ['./lista-deseos.page.scss'],
})
export class ListaDeseosPage implements OnInit {
  productos: any[] = [];
  constructor(private modalController: ModalController,
              private eventosService: EventosService,
              private modalCtrl: ModalController) { }

  ngOnInit() {
    const idUsuarioActual = JSON.parse(localStorage.getItem('user')).uid;
    this.eventosService.obtenerProductosUsuario(idUsuarioActual).subscribe(data => {
      console.log(data);
      this.productos = data;
    })
  }

  async mostrarPantallaCreacionProducto() {
      const modal = await this.modalController.create({
        component: CrearProductoPage,
        cssClass: 'modal-crear-producto-lista-deseos',
        swipeToClose: true
      });
      return await modal.present();
    }
    async mostrarProducto(producto: any) {

      const modal = await this.modalCtrl.create({
        component: MostrarProductoListaComponent,
        cssClass: 'modal-mostrar-producto',
        componentProps: {
          'producto': producto,
        }
      });
      return await modal.present();
    }
}
