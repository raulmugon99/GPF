import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {

  configuracion: any = {};
  idUsuarioActual = JSON.parse(localStorage.getItem('user')).uid;
  constructor(public afStore: AngularFirestore) {

    this.comprobarConfiguracionExiste(this.idUsuarioActual).subscribe((data) => {
      if(data.length===0){
        this.crearConfiguracion(this.idUsuarioActual, 10, 6,'Free')
      }else{
        this.configuracion = data[0];
      }
    })
   }

  crearConfiguracion(idUsuario: string, numPersonas: number, numRegalos: number, subscripcion: string) {
    return this.afStore.collection('Configuracion').doc(idUsuario).set({
      idUsuario,
      estado: 1,
      fechacreacion: new Date().toISOString(),
      numPersonas,
      numRegalos,
      subscripcion
    })
  }
  comprobarConfiguracionExiste(idUsuario: string) {
    return this.afStore.collection('Configuracion', ref => ref.where('idUsuario', '==', idUsuario)
    )
    .valueChanges()
  }


  SumarRegalo(idUsuario: string, cantidadAnterior: number) {
    return this.afStore.collection('Configuracion').doc(idUsuario).update({
      numRegalos: cantidadAnterior + 1 
    })
  }
  SumarPersona(idUsuario: string, cantidadAnterior: number) {
    return this.afStore.collection('Configuracion').doc(idUsuario).update({
      numPersonas: cantidadAnterior + 1 
    })
  }


}
