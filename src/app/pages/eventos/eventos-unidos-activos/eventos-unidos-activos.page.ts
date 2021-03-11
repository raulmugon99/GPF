import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController, ModalController } from '@ionic/angular';
import { EventosService } from 'src/app/services/eventos.service';
import { MostrarEventoUnidoPage } from '../mostrar-evento-unido/mostrar-evento-unido.page';

@Component({
  selector: 'app-eventos-unidos-activos',
  templateUrl: './eventos-unidos-activos.page.html',
  styleUrls: ['./eventos-unidos-activos.page.scss'],
})
export class EventosUnidosActivosPage implements OnInit {

  eventosActivos:any;
  constructor(private eventosService: EventosService,
              private modalCtrl: ModalController,
              private router: Router,
              private animationCtrl: AnimationController) {
                
               }

  ngOnInit() {
    const idUsuarioActual = JSON.parse(localStorage.getItem('user')).uid;
    this.eventosService.obtenerRLEvenUsu(idUsuarioActual).subscribe((data: any) => {
      this.eventosActivos = [];
      data.forEach(element => {
        this.eventosService.obtenerEvento(element.idEvento).subscribe((evento: any) => {
              this.eventosActivos.push(evento[0]);                    
        })
      });
    })
  }

  async test(evento: any, indice: number) {
    const modal = await this.modalCtrl.create({
      component: MostrarEventoUnidoPage,
      presentingElement:document.getElementById(`evento${indice}`),
      cssClass: 'my-custom-class',
      componentProps: {
        'evento': evento,
      },
      swipeToClose: true,
    });

    return await modal.present();
  }

}

