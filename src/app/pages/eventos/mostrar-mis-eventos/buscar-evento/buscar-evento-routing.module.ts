import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuscarEventoPage } from './buscar-evento.page';

const routes: Routes = [
  {
    path: '',
    component: BuscarEventoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuscarEventoPageRoutingModule {}
