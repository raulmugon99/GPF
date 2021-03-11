import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from 'src/app/guards/login.guard';
import { ListaDeseosPageModule } from '../lista-deseos/lista-deseos.module';
// import { LoginGuard } from 'src/app/guards/login.guard';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'inicio',
        loadChildren: () => import('../inicio/inicio.module').then(m => m.InicioPageModule),
        canActivate: [LoginGuard]
      },
      {
        path: 'eventos-unidos-activos',
        loadChildren: () => import('../eventos/eventos-unidos-activos/eventos-unidos-activos.module').then( m => m.EventosUnidosActivosPageModule),
        canActivate: [LoginGuard]
      },
      {
        path: 'notificaciones',
        loadChildren: () => import('../notificaciones/notificaciones.module').then(m => m.NotificacionesPageModule),
        canActivate: [LoginGuard]
      },
      {
        path: 'lista-deseos',
        loadChildren: () => import('../lista-deseos/lista-deseos.module').then(m => m.ListaDeseosPageModule),
        canActivate: [LoginGuard]
      },
      {
        path: '',
        redirectTo: '/tabs/inicio',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/inicio',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
