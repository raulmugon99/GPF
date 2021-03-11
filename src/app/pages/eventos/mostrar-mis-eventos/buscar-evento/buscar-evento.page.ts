import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-buscar-evento',
  templateUrl: './buscar-evento.page.html',
  styleUrls: ['./buscar-evento.page.scss'],
})
export class BuscarEventoPage implements OnInit {

  eventosCriterio: any[] = [];
  constructor(private eventosService: EventosService,
      private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  buscarEvento(evento) {
    this.eventosCriterio = [];
    const idUsuarioActual = JSON.parse(localStorage.getItem('user')).uid;
    this.eventosService.obtenerEventosUsuarioCriterio(idUsuarioActual,'nombre').subscribe((data: any) => {
      this.eventosCriterio = [];
      data.forEach(element => {
        if(element.nombreEvento.includes(evento.detail.value)){
          this.eventosCriterio.push(element);
        }
      });
      console.log(this.eventosCriterio);
    })
  }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }
  borrarEvento(evento: any) {
    this.eventosService.borrarEvento(evento).then(data => {
      console.log(data);
    })
  }
}