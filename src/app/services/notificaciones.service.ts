import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  notificaciones = [];
  // idUsuarioActual = JSON.parse(localStorage.getItem('user')).uid;
  idUsuarioActual = 'hola'
  constructor(public afStore: AngularFirestore) {
    this.afStore.collection('notificaciones', ref => ref.where('idUsuarioCreacion', '==', this.idUsuarioActual) .where('estado', '==', 1) )
    .valueChanges().subscribe(data => {
      this.notificaciones = data;
    })
   }

  
  crearNotificacion(idEvento: string, idUsuario: string, idUsuarioCreacion,nombreUsuario,evento,texto,foto,tipo) {
    return this.afStore.collection('notificaciones').doc(idEvento +'-'+ idUsuarioCreacion+'-'+idUsuario).set({
      idNotificacion: idEvento +'-'+ idUsuarioCreacion+'-'+idUsuario,
      nombreUsuario,
      evento,
      texto,
      foto,
      tipo,
      fechaCreacion: new Date().toISOString(),
      idUsuarioCreacion,
      idUsuario,
      idEvento,
      estado:1,
      vista: 0
    })
  }

  obtenerNotificaciones(idUsuario: string) {
    return this.afStore.collection('notificaciones', ref => ref.where('idUsuarioCreacion', '==', idUsuario) .where('estado', '==', 1) )
    .valueChanges();
  }
  MarcarNotificacionComoVista(idNotificacion: string) {
    return this.afStore.collection('notificaciones').doc(idNotificacion).update({
      vista: 1
    })
  }
  EliminarNotificacion(idNotificacion) {
    return this.afStore.collection('notificaciones').doc(idNotificacion).delete();
  }
}
