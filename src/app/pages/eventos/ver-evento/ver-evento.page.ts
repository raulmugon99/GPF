import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { MostrarCodigoComponent } from 'src/app/components/mostrar-codigo/mostrar-codigo.component';
import { MostrarProductoComponent } from 'src/app/components/mostrar-producto/mostrar-producto.component';
import { EventosService } from 'src/app/services/eventos.service';
import { CrearProductoPage } from '../../lista-deseos/crear-producto/crear-producto.page';

@Component({
  selector: 'app-ver-evento',
  templateUrl: './ver-evento.page.html',
  styleUrls: ['./ver-evento.page.scss'],
})
export class VerEventoPage implements OnInit {

  evento: any;
 productosEvento: any;
  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private eventosService: EventosService,
    private modalCtrl: ModalController
    // private socialSharing: SocialSharing
    ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.evento= this.router.getCurrentNavigation().extras.state.evento;
      }
    });

    this.eventosService.obtenerProductosEventosUsuario(this.evento.idEvento).subscribe(resp => {
      console.log(resp);
      this.productosEvento = resp;
    })
  }

  copiarCodigoClipboard() {
    // this.clipboard.copy(this.evento.idEvento);
  }
  async mostrarCodigo() {
    const modal = await this.modalCtrl.create({
      component: MostrarCodigoComponent,
      cssClass: 'modal-mostrar-codigo',
      componentProps: {
        'idEvento': this.evento.idEvento,
      }
    });
    return await modal.present();
  }

  async mostrarProducto(producto: any) {
    const modal = await this.modalCtrl.create({
      component: MostrarProductoComponent,
      cssClass: 'modal-mostrar-producto',
      componentProps: {
        'producto': producto,
      }
    });
    return await modal.present();
  }

  compartirEvento() {
    // this.socialSharing.shareViaTwitter('hola').then(data=> {
    //   console.log(data);
    // })
    // .catch(err => {
    //   console.error(err);
    // })
  }
  async crearProducto(idEvento: string) {
    const modal = await this.modalCtrl.create({
      component: CrearProductoPage,
      cssClass: 'modal-crear-producto-lista-deseos',
      componentProps: {
        'idEvento': idEvento
      },
      swipeToClose: true
    });
    return await modal.present();
  }
}
