import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MostrarEventoUnidoPageRoutingModule } from './mostrar-evento-unido-routing.module';

import { MostrarEventoUnidoPage } from './mostrar-evento-unido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MostrarEventoUnidoPageRoutingModule
  ],
  declarations: [MostrarEventoUnidoPage]
})
export class MostrarEventoUnidoPageModule {}
