import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventosUnidosActivosPageRoutingModule } from './eventos-unidos-activos-routing.module';

import { EventosUnidosActivosPage } from './eventos-unidos-activos.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    EventosUnidosActivosPageRoutingModule
  ],
  declarations: [EventosUnidosActivosPage]
})
export class EventosUnidosActivosPageModule {}
