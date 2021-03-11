import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MostrarEventoUnidoPage } from './mostrar-evento-unido.page';

const routes: Routes = [
  {
    path: '',
    component: MostrarEventoUnidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MostrarEventoUnidoPageRoutingModule {}
