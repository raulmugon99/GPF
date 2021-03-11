import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MostrarEventoUnirsePage } from './mostrar-evento-unirse.page';

const routes: Routes = [
  {
    path: '',
    component: MostrarEventoUnirsePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MostrarEventoUnirsePageRoutingModule {}
