import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ViewDidEnter } from '@ionic/angular';
import { ErroresService } from 'src/app/services/errores.service';
import { EventosService } from 'src/app/services/eventos.service';
import { MostrarEventosActivosComponent } from '../mostrar-eventos-activos/mostrar-eventos-activos.component';

@Component({
  selector: 'app-mostrar-producto-lista',
  templateUrl: './mostrar-producto-lista.component.html',
  styleUrls: ['./mostrar-producto-lista.component.scss'],
})
export class MostrarProductoListaComponent implements OnInit, ViewDidEnter {
  @Input() producto: any;
  constructor(private modalController: ModalController,
    private eventosService: EventosService,
    private erroresService: ErroresService) { }
  eventosActivos: any;
  slideOpts = {
    initialSlide: 0,
    slidesPerView:1,
    speed: 400
  };
  ngOnInit() {
  }
  async test(){
      const modal = await this.modalController.create({
        component: MostrarEventosActivosComponent,
        cssClass: 'modal-mostrar-eventos-activos-lista',
        swipeToClose: true,
        backdropDismiss: true,
        componentProps: {
          'producto': this.producto
        }
      });
      return await modal.present(); 
  }
  mostrarSlide = false;
  ionViewDidEnter(): void {
    this.mostrarSlide= true;
  }
  cerrarModal() {
    this.modalController.dismiss();
  }
  borrarProducto() {
    this.eventosService.EliminarProducto(this.producto.idProducto).then(()=>{
      this.erroresService.presentToast('Producto eliminado correctamente.', 'danger')
      this.modalController.dismiss();
    })
    
  }
}