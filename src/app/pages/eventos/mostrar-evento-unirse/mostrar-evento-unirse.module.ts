import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MostrarEventoUnirsePageRoutingModule } from './mostrar-evento-unirse-routing.module';

import { MostrarEventoUnirsePage } from './mostrar-evento-unirse.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MostrarEventoUnirsePageRoutingModule
  ],
  declarations: [MostrarEventoUnirsePage]
})
export class MostrarEventoUnirsePageModule {}
