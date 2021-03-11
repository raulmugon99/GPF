import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from '../app-routing.module';
import { PipesModule } from '../pipes/pipes.module';
import { MostrarCodigoComponent } from './mostrar-codigo/mostrar-codigo.component';
// import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { MostrarProductoComponent } from './mostrar-producto/mostrar-producto.component';
import { MostrarEventosActivosComponent } from './mostrar-eventos-activos/mostrar-eventos-activos.component';
import { MostrarProductoListaComponent } from './mostrar-producto-lista/mostrar-producto-lista.component';



@NgModule({
  declarations: [MenuComponent, MostrarCodigoComponent, MostrarProductoComponent, MostrarEventosActivosComponent,MostrarProductoListaComponent],
  imports: [
    CommonModule,
    IonicModule,
    AppRoutingModule,
    PipesModule,
    // NgxQRCodeModule
  ],
  exports: [MenuComponent]
})
export class ComponentsModule { }
