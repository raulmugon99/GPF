import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ViewDidEnter } from '@ionic/angular';

@Component({
  selector: 'app-mostrar-producto',
  templateUrl: './mostrar-producto.component.html',
  styleUrls: ['./mostrar-producto.component.scss'],
})
export class MostrarProductoComponent implements OnInit,ViewDidEnter {
  @Input() producto: any;
  constructor(private modalCtrl: ModalController) { }
  slideOpts = {
    initialSlide: 0,
    slidesPerView:1,
    speed: 400
  };
  ngOnInit() {
  }
  mostrarSlide = false;
  ionViewDidEnter(): void {
    this.mostrarSlide= true;
  }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }
}
