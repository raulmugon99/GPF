import { Component, OnInit } from '@angular/core';
import { ErroresService } from 'src/app/services/errores.service';
import { EventosService } from 'src/app/services/eventos.service';
import { NotificacionesService } from 'src/app/services/notificaciones.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit {

  notificacionesActivas: any[] = [];
  constructor(public notificacionesService: NotificacionesService,
              private eventosService: EventosService,
              private erroresService: ErroresService) { }

  ngOnInit() {
    const idUsuarioActual = JSON.parse(localStorage.getItem('user')).uid;
    this.notificacionesService.obtenerNotificaciones(idUsuarioActual).subscribe(data=> {
      this.notificacionesActivas = data;
    })
   
  }
  cambiarCriterio(evento){
    this.notificacionesActivas = [];

    const idUsuarioActual = JSON.parse(localStorage.getItem('user')).uid;

      if (evento.detail.value === 'solicitudes') {
        this.notificacionesService.notificaciones.forEach(element => {
          if (element.tipo === 'solicitud') {
            this.notificacionesActivas.push(element);
          }
        });
      }else  if (evento.detail.value === 'notificaciones') {
        this.notificacionesService.notificaciones.forEach(element => {
          console.log(element);
          if (element.tipo === 'notificacion') {
            this.notificacionesActivas.push(element);
          }
        });
      }else{
        this.notificacionesActivas = this.notificacionesService.notificaciones;
      }
    this.notificacionesActivas.sort(function(a, b) { a = new Date(a.fechaCreacion); b = new Date(b.fechaCreacion); return a>b ? -1 : a<b ? 1 : 0; });

  }

  borrarNotificacion(idNotificacion) {
    this.notificacionesService.EliminarNotificacion(idNotificacion).then(()=> {
      
    })
  }

  aceptarSolicitud(notificacion: any) {
    if (notificacion.evento.personasUnidas >= notificacion.evento.numPersonas){
      this.erroresService.mostrarError("Evento completo.")
    }else{
      this.crearUnion(notificacion.idEvento, notificacion.idUsuario,notificacion.evento.fechaHasta, notificacion.evento, notificacion.idUsuarioCreacion, notificacion.nombreUsuario);
      this.eventosService.AgregarPersonaUnidaEvento(notificacion.evento.idEvento, notificacion.evento.personasUnidas);
    }
  }
  cancelarSolicitud(notificacion: any) {
    console.log(notificacion)
  }
  crearUnion(idEvento: string, idUsuarioUnirse: string, fechaHasta: string, evento: any, idUsuarioCreacion, nombre: string) {
    const UsuarioActual = JSON.parse(localStorage.getItem('user'));
    this.eventosService.crearRLEvenUsu(idEvento, idUsuarioUnirse, fechaHasta,UsuarioActual.photoURL).then(() => {
      this.notificacionesService.crearNotificacion(idEvento,UsuarioActual.uid,idUsuarioCreacion,nombre ,evento,'Se ha unido a tu evento.',UsuarioActual.photoURL,'notificacion')
    })
  }
  leerNotificacion(idNotificacion: string) {
    this.notificacionesService.MarcarNotificacionComoVista(idNotificacion).then(()=> {
      console.log("Borrada")
    this.notificacionesActivas = this.notificacionesService.notificaciones;
    })
  }
}