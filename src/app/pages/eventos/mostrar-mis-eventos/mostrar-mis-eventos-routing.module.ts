import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MostrarMisEventosPage } from './mostrar-mis-eventos.page';

const routes: Routes = [
  {
    path: '',
    component: MostrarMisEventosPage
  },
  {
    path: 'papelera',
    loadChildren: () => import('./papelera/papelera.module').then( m => m.PapeleraPageModule)
  },
  {
    path: 'buscar-evento',
    loadChildren: () => import('./buscar-evento/buscar-evento.module').then( m => m.BuscarEventoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MostrarMisEventosPageRoutingModule {}
