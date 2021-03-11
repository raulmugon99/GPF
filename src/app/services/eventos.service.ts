import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class EventosService {

  constructor(public afStore: AngularFirestore) { }


  buscarEvento(idEvento: string, idUsuario: any) {
    return this.afStore.collection('eventos', ref => ref.where('idEvento', '==', idEvento) .where('estado','==',1) .where('idUsuario','!=',idUsuario)
    )
    .valueChanges().pipe(take(1))
  }
  comprobarRLEvenUsu(idUsuario: string, idEvento: string) {
    return this.afStore.collection('RLEvenUsu', ref => ref.where('idUsuario', '==', idUsuario) .where('idEvento', '==', idEvento)
    )
    .valueChanges().pipe(take(1))
  }
  comprobarEventoPasado(evento: any, nombreCampo: string) {
    let fecha = evento[nombreCampo];
    let a = new Date(fecha)
    if (new Date() > a){
      return true;
    }else{
      return false;
    }
  }
  obtenerRLEvenUsu(idUsuario: string) {
    return this.afStore.collection('RLEvenUsu', ref => ref.where('idUsuario', '==', idUsuario)
    )
    .valueChanges()
  }
  obtenerEvento(idEvento: any) {
    return this.afStore.collection('eventos', ref => ref.where('idEvento', '==', idEvento)
    )
    .valueChanges().pipe(take(1))
  }

  AgregarPersonaUnidaEvento(idEvento: string, personasActuales: number) {
    this.afStore.collection('eventos').doc(idEvento).update({
      personasUnidas: personasActuales+1
    })
    .then(()=> {

    })
    .catch((err)=> {
      console.log(err)
    })
  }
  crearRLEvenUsu(idEvento: string, idUsuario: string,fechaHasta: string, imagenCreador: string) {
    return this.afStore.collection('RLEvenUsu').doc(idEvento+'-'+idUsuario).set({
      idEvento,
      idUsuario,
      fechacreacion: new Date().toISOString(),
      fechaHasta,
      imagenCreador
    })
  }
  obtenerProductosUsuario(idUsuario) {
    return this.afStore.collection('productos', ref => ref.where('idUsuario', '==', idUsuario) .where('idEvento', '==', ''))
    .valueChanges()
  }
  obtenerEventosUsuario(idUsuario: string) {
    return this.afStore.collection('eventos', ref => ref.where('idUsuario', '==', idUsuario) .where('estado','==',1) )
    .valueChanges();
  }
  comprobarProductoEvento(idProducto: string, idEvento: string) {
    console.log(idProducto)
    console.log(idEvento)
    return this.afStore.collection('productos', ref => ref.where('idEvento', '==', idEvento) .where('idProducto', '==', idProducto) 
    )
    .valueChanges()
  }
  crearProductoEvento2(idProducto: string ,idEvento: string, nombre: string, precio: string, link: string, descripcion: string,imagen1: string, imagen2: string, imagen3: string, idUsuario: string) {
    let id = this.obtenerIDAleatorio()
    return this.afStore.collection('productos').doc(id).set({
      idProducto,
      idEvento,
      nombre,
      precio,
      link,
      fechacreacion: new Date().toISOString(),
      descripcion,
      imagen1,
      imagen2,
      imagen3,
      idUsuario
    })
  }
  EliminarProducto(idProducto) {
    return this.afStore.collection('productos').doc(idProducto).delete();
  }
  obtenerIDAleatorio() {
    return this.afStore.createId();
  }
  crearProductoEvento(idProducto: string ,idEvento: string, nombre: string, precio: string, link: string, descripcion: string,imagen1: string, imagen2: string, imagen3: string, idUsuario: string) {
    return this.afStore.collection('productos').doc(idProducto).set({
      idProducto,
      idEvento,
      nombre,
      precio,
      link,
      fechacreacion: new Date().toISOString(),
      descripcion,
      imagen1,
      imagen2,
      imagen3,
      idUsuario
    })
  }
  obtenerProductosEventosUsuario(idEvento: string) {
    return this.afStore.collection('productos', ref => ref.where('idEvento', '==', idEvento))
    .valueChanges();
  }
  obtenerRLEvenUsuProducto(idEvento: string) {
    return this.afStore.collection('RLEvenUsuProducto', ref => ref.where('idEvento', '==', idEvento)
    )
    .valueChanges()
  }
  crearRLEvenUsuProducto(idEvento: string, idUsuario: string, idProducto: string) {
    return this.afStore.collection('RLEvenUsuProducto').doc(idEvento+'-'+idProducto).set({
      idEvento,
      idUsuario,
      idProducto,
      fechacreacion: new Date().toISOString()
    })
  }
  crearEvento(idEvento: string,idUsuario: string, nombreUsuario: string, nombreEvento: string, fechaHasta: string, privacidad: string, numPersonas: string, numRegalos: string) {
    return this.afStore.collection('eventos').doc(idEvento).set({
      idEvento,
      idUsuario,
      nombreUsuario,
      nombreEvento,
      estado: 1,
      fechacreacion: new Date().toISOString(),
      fechaHasta,
      privacidad,
      numPersonas,
      numRegalos,
      personasUnidas: 0
    })
  }
  borrarEvento(uid: string) {
    return this.afStore.collection('eventos').doc(uid).update({
      estado: 0
    })
  }
  recuperarEvento(uid: string) {
    return this.afStore.collection('eventos').doc(uid).update({
      estado: 1
    })
  }
  obtenerEventosUsuarioCriterio(idUsuario: string, criterio: string,) {
    return this.afStore.collection('eventos', ref => ref.where('idUsuario', '==', idUsuario)
    )
    .valueChanges()
  }
  obtenerEventosUsuarioBorrados(idUsuario: string) {
    return this.afStore.collection('eventos', ref => ref.where('idUsuario', '==', idUsuario) .where('estado','==',0) )
    .valueChanges();
  }
}
