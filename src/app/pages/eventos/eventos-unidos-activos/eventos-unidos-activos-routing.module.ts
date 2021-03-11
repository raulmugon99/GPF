import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventosUnidosActivosPage } from './eventos-unidos-activos.page';

const routes: Routes = [
  {
    path: '',
    component: EventosUnidosActivosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventosUnidosActivosPageRoutingModule {}
