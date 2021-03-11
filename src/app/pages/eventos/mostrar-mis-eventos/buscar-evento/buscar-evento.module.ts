import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuscarEventoPageRoutingModule } from './buscar-evento-routing.module';

import { BuscarEventoPage } from './buscar-evento.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuscarEventoPageRoutingModule,
    PipesModule
  ],
  declarations: [BuscarEventoPage]
})
export class BuscarEventoPageModule {}
