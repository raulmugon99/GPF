import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController, ToastController, AnimationController } from '@ionic/angular';
import { MostrarProductoComponent } from 'src/app/components/mostrar-producto/mostrar-producto.component';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-mostrar-evento-unido',
  templateUrl: './mostrar-evento-unido.page.html',
  styleUrls: ['./mostrar-evento-unido.page.scss'],
})
export class MostrarEventoUnidoPage implements OnInit {

  evento: any;
  productos: any;
  productosSeleccionados: any[] = [];
  cantProductosSeleccionados = 0;



  constructor(private router: Router,
              private eventosService: EventosService,
              private modalCtrl: ModalController,
              private navCtrl: NavController,
              public toastController: ToastController,
              private animationCtrl: AnimationController){ }
  ngOnInit(): void {
     this.cargarProductos();
     this.cargarProductosSeleccionados();
  }
  cargarProductos() {
    this.eventosService.obtenerProductosEventosUsuario(this.evento.idEvento).subscribe(data => {
      this.productos = data;
    })
  }

  cargarProductosSeleccionados() {
    const idUsuarioActual = JSON.parse(localStorage.getItem('user')).uid;
    this.productosSeleccionados = [];
    this.eventosService.obtenerRLEvenUsuProducto(this.evento.idEvento).subscribe(data => {
      this.cantProductosSeleccionados = 0;
      data.forEach((element: any) => {
        this.añadirProductoSeleccionado(element.idProducto)
        if (element.idUsuario === idUsuarioActual){
          this.cantProductosSeleccionados ++;
        }
      });
    })
  }

  async mostrarProducto(producto: any) {
    const enterAnimation = (baseEl: any) => {
      const backdropAnimation = this.animationCtrl.create()
        .addElement(baseEl.querySelector('ion-backdrop')!)
        .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

      const wrapperAnimation = this.animationCtrl.create()
        .addElement(baseEl.querySelector('.modal-wrapper')!)
        .keyframes([
          { offset: 0, opacity: '0', transform: 'scale(0)' },
          { offset: 1, opacity: '0.99', transform: 'scale(1)' }
        ]);

      return this.animationCtrl.create()
        .addElement(baseEl)
        .easing('ease-out')
        .duration(500)
        .addAnimation([backdropAnimation, wrapperAnimation]);
    }

    const leaveAnimation = (baseEl: any) => {
      return enterAnimation(baseEl).direction('reverse');
    }
    const modal = await this.modalCtrl.create({
      component: MostrarProductoComponent,
      cssClass: 'modal-mostrar-producto',
      componentProps: {
        'producto': producto,
      },
      leaveAnimation,
      enterAnimation
    });
    return await modal.present();
  }

  volverInicio() {
    // this.navCtrl.navigateBack('/tabs/eventos-unido');
    this.modalCtrl.dismiss();
  }


  crearUnionProductoUsuarioElegido(evento: any, idProducto: string) {
    if (this.cantProductosSeleccionados >= evento.numRegalos) {
      this.mostrarToast(`Has alcanzado la cantidad máxima (${this.cantProductosSeleccionados}/${evento.numRegalos}).`, 'danger')
      return;
    }
    const idUsuarioActual = JSON.parse(localStorage.getItem('user')).uid;
    this.eventosService.crearRLEvenUsuProducto(evento.idEvento, idUsuarioActual, idProducto).then(data => {
      this.mostrarToast(`Producto seleccionado (${this.cantProductosSeleccionados}/${evento.numRegalos})`, 'dark')
    })

    console.log(idProducto)
  }

  añadirProductoSeleccionado(idProducto: string) {
    if (!this.productosSeleccionados.includes(idProducto)){
      this.productosSeleccionados.push(idProducto)
    }
  }

  async mostrarToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1200,
      color
    });
    toast.present();
  }
}
