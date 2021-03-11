import { Component, Input, OnInit } from '@angular/core';
// import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-mostrar-codigo',
  templateUrl: './mostrar-codigo.component.html',
  styleUrls: ['./mostrar-codigo.component.scss'],
})
export class MostrarCodigoComponent implements OnInit {
  // elementType = NgxQrcodeElementTypes.URL;
  // correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value: any;
  @Input() idEvento: string;
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    this.value = this.idEvento;
   }

   cerrarModal() {
     this.modalCtrl.dismiss();
   }
}
