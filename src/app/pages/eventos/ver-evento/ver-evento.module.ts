import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerEventoPageRoutingModule } from './ver-evento-routing.module';

import { VerEventoPage } from './ver-evento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerEventoPageRoutingModule
  ],
  declarations: [VerEventoPage]
})
export class VerEventoPageModule {}
