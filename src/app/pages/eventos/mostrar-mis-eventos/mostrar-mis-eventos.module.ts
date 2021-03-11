import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MostrarMisEventosPageRoutingModule } from './mostrar-mis-eventos-routing.module';

import { MostrarMisEventosPage } from './mostrar-mis-eventos.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MostrarMisEventosPageRoutingModule,
    PipesModule
  ],
  declarations: [MostrarMisEventosPage]
})
export class MostrarMisEventosPageModule {}
