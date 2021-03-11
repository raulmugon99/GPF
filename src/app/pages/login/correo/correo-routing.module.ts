import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CorreoPage } from './correo.page';

const routes: Routes = [
  {
    path: '',
    component: CorreoPage
  },
  {
    path: 'registro',
    loadChildren: () => import('../registro/registro.module').then( m => m.RegistroPageModule),
  },
  {
    path: 'iniciar-sesion',
    loadChildren: () => import('../iniciar-sesion/iniciar-sesion.module').then( m => m.IniciarSesionPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CorreoPageRoutingModule {}
