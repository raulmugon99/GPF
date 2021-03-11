import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { ModalController } from '@ionic/angular';
import { ErroresService } from 'src/app/services/errores.service';
import { EventosService } from 'src/app/services/eventos.service';
import { PatrocinadoresService } from 'src/app/services/patrocinadores.service';
import { CrearEventoPage } from '../eventos/crear-evento/crear-evento.page';
import { MostrarEventoUnirsePage } from '../eventos/mostrar-evento-unirse/mostrar-evento-unirse.page';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(private barcodeScanner: BarcodeScanner,
              private eventosService: EventosService,
              private modalController: ModalController,
              private route: ActivatedRoute,
              private erroresService: ErroresService,
              public patrocinadoresService: PatrocinadoresService) {}

  ngOnInit(): void {
    document.getElementById('iidEvento')['value']=this.route.snapshot.paramMap.get("codigoEvento");
    this.patrocinadoresService.obtenerPatrocinadores();
  }
  

  doRefresh(evento: any){
    setTimeout(() => {
      this.patrocinadoresService.obtenerPatrocinadores()
      evento.target.complete();
    }, 1000);
  }

  escanearCodigo() {
    const opciones : BarcodeScannerOptions = {
          // showFlipCameraButton : true, // iOS and Android
          // torchOn: true, // Android, launch with the torch switched on (if available)
          prompt : "Escanea el código GIFTPARTY", // Android
          resultDisplayDuration: 300, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          formats : "QR_CODE", // default: all but PDF_417 and RSS_EXPANDED
          orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
          // disableAnimations : true, // iOS
          // disableSuccessBeep: false // iOS and Android
    }
    this.barcodeScanner.scan(opciones).then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.cambio(barcodeData.text)
     }).catch(err => {
         console.log('Error', err);
         this.erroresService.mostrarError(err)
     });
  }

  cambio(codigo: any) {  
    if (codigo.length === 20){
      const idUsuarioActual = JSON.parse(localStorage.getItem('user')).uid;
      this.eventosService.buscarEvento(codigo,idUsuarioActual).subscribe(data => {
        if(data.length ===1){
          this.presentModal(data[0]);
        }else{
          this.erroresService.mostrarError('No es posible unirse a ese evento.');
        }
      })
    }else{
      this.erroresService.mostrarError('La longitud del codigo no es valida.');
    }
  }

  async presentModal(evento: any) {
    const idUsuarioActual = JSON.parse(localStorage.getItem('user')).uid;
    const a = await this.eventosService.comprobarRLEvenUsu(idUsuarioActual, evento.idEvento).subscribe(async data => {
      console.log(data.length)
      if (data.length !== 1){
        const modal = await this.modalController.create({
          component: MostrarEventoUnirsePage,
          componentProps: {
            'evento': evento
          },
          cssClass: 'modal-mostrar-evento'
        });
        return await modal.present();
      }else if (data.length>0){
        if(this.eventosService.comprobarEventoPasado(evento,'fechaHasta')){
          console.log('evento pasado')
        }else{
          this.erroresService.mostrarError('Ya te has unido a este evento.');
        }
      }else{
        console.log('error')
      }
    },(err)=>{console.log(err)})
  }
  
  async mostrarModalCrearEvento() {
    const modal = await this.modalController.create({
      component: CrearEventoPage,
      cssClass: 'modal-crear-evento',
      swipeToClose: true,
    });
    return await modal.present();
  }
}
