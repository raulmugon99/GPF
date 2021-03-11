import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { InfoComponent } from 'src/app/components/info/info.component';
import { AuthService } from 'src/app/services/auth.service';
import { ConfiguracionService } from 'src/app/services/configuracion.service';
import { EventosService } from 'src/app/services/eventos.service';
import { CrearProductosEventoPage } from '../crear-productos-evento/crear-productos-evento.page';

@Component({
  selector: 'app-crear-evento',
  templateUrl: './crear-evento.page.html',
  styleUrls: ['./crear-evento.page.scss'],
})
export class CrearEventoPage implements OnInit {

  public privacidadObject = [
    { val: 'Abierta',des:'Cualquier persona puede unirse.',color:'success', isChecked: true },
    { val: 'Privada',des:'Solo personas con enlace pueden unirse.',color:'danger', isChecked: false }
  ];
  privacidad: string = 'Abierta';

  nombresMes = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  nombresSemana = ['Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo', 'Lunes']

  fechaDeHoy: any = new Date().toLocaleDateString();
  cantidadPersonas: number;

  errores = {
    nombre: false,
    privacidad: false,
    cantidad: false,
    fecha: false
  }

  constructor(private modalCtrl: ModalController,
              private eventosService: EventosService,
              private authService: AuthService,
              private popoverController: PopoverController,
              public configuracionService: ConfiguracionService) {

               }

  ngOnInit() {
    // this.establecerFechas();
    document.getElementById("idate")['value'] = new Date().toISOString()
  }


  cambioCheck(item) {
    this.privacidadObject.forEach(element=>{
      element.isChecked=false;
    });
    this.privacidad = item.val;
  }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }

 comprobarPrivacidad() {
   this.privacidadObject.forEach(element => {
     if(element.isChecked){
      console.log(element.val);
       return element.val;
     }
   });
 }
 comprobarErroresFecha() {
  let hoy = new Date();
  let DIA_EN_MILISEGUNDOS = 24 * 60 * 60 * 1000;
  let manana = new Date(hoy.getTime() + DIA_EN_MILISEGUNDOS);
  let f = new Date(document.getElementById("idate")['value']);
  console.log(f);
  console.log(manana);
  if ( f > manana) {
    return false;
  }else{
    return true;
  }
 }

  crearEvento(nombreEvento: string, fechaHasta: Date, privacidad: string, numPersonas: string, numRegalos: string) {
    if (nombreEvento.length===0){
      this.errores.nombre=true;
      return;
    }else{
      this.errores.nombre=false;
    }
    if (this.comprobarErroresFecha()){
      this.errores.fecha=true;
      return;
    }
    let idEvento = this.eventosService.obtenerIDAleatorio();
    let date: any = new Date(fechaHasta['value']);
    date = date.toISOString();
    this.eventosService.crearEvento(idEvento,
                                    this.authService.userData.uid,
                                    this.authService.userData.displayName,
                                    nombreEvento,
                                    date,
                                    this.privacidad,
                                    numPersonas,
                                    numRegalos)
    .then(() => {
      this.modalCtrl.dismiss();
      this.siguientePagina(idEvento);
    })
    .catch((err) => {
      console.error(err);
    });
  }


  async siguientePagina(idEvento: string) {
      const modal = await this.modalCtrl.create({
        component: CrearProductosEventoPage,
        cssClass: 'modal-crear-evento',
        swipeToClose: true,
        componentProps: {
          'idEvento': idEvento,
        }
      });
      return await modal.present();
    }


    cambiarCantidad(cantidad: number, suma: boolean, tipo: string) {
      let cantidad2 = Number(cantidad);
      cantidad2= (suma) ? cantidad2 + 1 : cantidad2-1;
if (tipo === 'persona'){
  if (cantidad2 < 1 || cantidad2 > this.configuracionService.configuracion.numPersonas){
    return cantidad;
  }
  return cantidad2;
}else if (tipo === 'regalo'){
  if (cantidad2 < 1 || cantidad2 > this.configuracionService.configuracion.numRegalos){
    return cantidad;
  }
  return cantidad2;
}

    }

    async mostrarInfo(event, idMensaje) {
      let mensaje: string;
      if (idMensaje === 1){
        mensaje = "Nombre identificativo, con el cual las personas reconoceran el evento."
      } else if (idMensaje === 2){
        mensaje = "Selecciona quien puede unirse a tu evento."
      } else if (idMensaje === 3){
        mensaje = "Selecciona el dia de tu evento."
      } else if (idMensaje === 4){
        mensaje = "Selecciona cuantas personas pueden participar en tu evento."
      } else if (idMensaje === 4){
        mensaje = "Selecciona cuantos regalos podrá elegir cada persona."
      }

      const popover = await this.popoverController.create({
        component: InfoComponent,
        cssClass: 'popover-class',
        event: event,
        // translucent: true,
        componentProps: {
          mensaje: mensaje
        }
      });
      return await popover.present();
    }
}

