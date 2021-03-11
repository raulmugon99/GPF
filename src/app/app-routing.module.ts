<<<<<<< HEAD
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'eu',
    loadChildren: () => import('./pages/eventos/mostrar-evento-unido/mostrar-evento-unido.module').then( m => m.MostrarEventoUnidoPageModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'ce',
    loadChildren: () => import('./pages/eventos/crear-evento/crear-evento.module').then( m => m.CrearEventoPageModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'cp',
    loadChildren: () => import('./pages/eventos/crear-productos-evento/crear-productos-evento.module').then( m => m.CrearProductosEventoPageModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'mostrar-mis-eventos',
    loadChildren: () => import('./pages/eventos/mostrar-mis-eventos/mostrar-mis-eventos.module').then( m => m.MostrarMisEventosPageModule)
  },  {
    path: 'ajustes',
    loadChildren: () => import('./pages/ajustes/ajustes.module').then( m => m.AjustesPageModule)
=======
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'eu',
    loadChildren: () => import('./pages/eventos/mostrar-evento-unido/mostrar-evento-unido.module').then( m => m.MostrarEventoUnidoPageModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'ce',
    loadChildren: () => import('./pages/eventos/crear-evento/crear-evento.module').then( m => m.CrearEventoPageModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'cp',
    loadChildren: () => import('./pages/eventos/crear-productos-evento/crear-productos-evento.module').then( m => m.CrearProductosEventoPageModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'mostrar-mis-eventos',
    loadChildren: () => import('./pages/eventos/mostrar-mis-eventos/mostrar-mis-eventos.module').then( m => m.MostrarMisEventosPageModule)
  },
  {
    path: 'ver-evento',
    loadChildren: () => import('./pages/eventos/ver-evento/ver-evento.module').then( m => m.VerEventoPageModule)
  },
  {
    path: 'configuracion',
    loadChildren: () => import('./pages/configuracion/configuracion.module').then( m => m.ConfiguracionPageModule)
>>>>>>> 590fda5f6f8fb3a6e31bb7fbd56e6635929b39ec
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
