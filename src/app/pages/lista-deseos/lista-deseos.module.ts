import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaDeseosPageRoutingModule } from './lista-deseos-routing.module';

import { ListaDeseosPage } from './lista-deseos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaDeseosPageRoutingModule
  ],
  declarations: [ListaDeseosPage]
})
export class ListaDeseosPageModule {}
