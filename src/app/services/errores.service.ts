import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class ErroresService {

  constructor(private toastController: ToastController) { }

  mostrarError(mensaje: string) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: mensaje,
      confirmButtonText:'Aceptar',
      backdrop: true,
      footer: '<a href>¿Por qué me aparece este error?</a>',
      heightAuto: false,
      didOpen: () => {
        Swal.hideLoading();
      }
    });
  }

  mostrarCargando() {
    Swal.fire({
      title: 'Cargando',
      allowEscapeKey: false,
      heightAuto: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  }
  cerrarAlerta() {
    Swal.close();
  }
  async presentToast(message: string, color: string = "dark") {
    const toast = await this.toastController.create({
      message,
      color,
      duration: 1200
    });
    toast.present();
  }

}