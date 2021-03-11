import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ConfiguracionService } from 'src/app/services/configuracion.service';
import { ErroresService } from 'src/app/services/errores.service';
import { EventosService } from 'src/app/services/eventos.service';
import { BuscarEventoPage } from './buscar-evento/buscar-evento.page';
import { PapeleraPage } from './papelera/papelera.page';

@Component({
  selector: 'app-mostrar-mis-eventos',
  templateUrl: './mostrar-mis-eventos.page.html',
  styleUrls: ['./mostrar-mis-eventos.page.scss'],
})
export class MostrarMisEventosPage implements OnInit {

  misEventos: any[] = [];
  constructor(public eventosService: EventosService,
    private router: Router,
    private modalCtrl: ModalController,
    public configuracionService: ConfiguracionService,
    private erroresService: ErroresService) { }

  ngOnInit() {
    setTimeout(() => {
      const idUsuarioActual = JSON.parse(localStorage.getItem('user')).uid;
      this.eventosService.obtenerEventosUsuario(idUsuarioActual)
      .subscribe((data) => {
        // console.log(data);
        this.misEventos = data;
        this.misEventos.forEach(element => {
          this.ComprobarEventoCaducado(element);
        });
      });
    }, 200);

  }

  ComprobarEventoCaducado(evento) {
      let fechaActual = new Date();
      let fechaComparar = new Date(evento.fechaHasta)
     if (fechaActual > fechaComparar) {
        console.log('EVENTO CADUCADO')
        this.borrarEvento(evento.idEvento)
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

  borrarEvento(evento: any) {
    this.eventosService.borrarEvento(evento.idEvento).then(data => {
      console.log("AAAAA",data);
      this.erroresService.presentToast("Evento borrado correctamente.", "danger")
    })
  }

  verEvento(evento: any){
    let navigationExtras: NavigationExtras = { state: { evento } };
    this.router.navigate(['ver-evento'], navigationExtras);
  }

  async mostrarPantallaBuscarEvento() {
    const modal = await this.modalCtrl.create({
      component: BuscarEventoPage
    });
    return await modal.present();
  }
  async mostrarPantallaPapelera() {
    const modal = await this.modalCtrl.create({
      component: PapeleraPage
    });
    return await modal.present();
  }
}
