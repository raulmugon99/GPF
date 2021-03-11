import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-papelera',
  templateUrl: './papelera.page.html',
  styleUrls: ['./papelera.page.scss'],
})
export class PapeleraPage implements OnInit {

  eventosBorrados: any[] = [];
  constructor(private eventosService: EventosService,
              private modalCtrl: ModalController) { }

  ngOnInit() {
    const idUsuarioActual = JSON.parse(localStorage.getItem('user')).uid;
    this.eventosService.obtenerEventosUsuarioBorrados(idUsuarioActual).subscribe(resp => {
      this.eventosBorrados = resp;
    })
  }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }
  recuperarEvento(evento: any) {
    let fechaActual = new Date();
    let fechaComparar = new Date(evento.fechaHasta)
   if (fechaActual > fechaComparar) {
      console.log('EVENTO CADUCADO')
    }else{
      console.log('EVENTO NO CADUCADO')
      if (evento.estado === 1){
        console.log('Ya esta activado')
      }else{
        this.eventosService.recuperarEvento(evento.idEvento).then(()=> {
          console.log("RECUPERADO");
        })
      }
    }
  }
}
