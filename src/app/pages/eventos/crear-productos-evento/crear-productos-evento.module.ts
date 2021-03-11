import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearProductosEventoPageRoutingModule } from './crear-productos-evento-routing.module';

import { CrearProductosEventoPage } from './crear-productos-evento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearProductosEventoPageRoutingModule
  ],
  declarations: [CrearProductosEventoPage]
})
export class CrearProductosEventoPageModule {}
