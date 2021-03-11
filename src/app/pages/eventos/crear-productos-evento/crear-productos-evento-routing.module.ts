import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearProductosEventoPage } from './crear-productos-evento.page';

const routes: Routes = [
  {
    path: '',
    component: CrearProductosEventoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearProductosEventoPageRoutingModule {}
