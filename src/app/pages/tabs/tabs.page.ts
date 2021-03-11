import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { EventosService } from 'src/app/services/eventos.service';
import { NotificacionesService } from 'src/app/services/notificaciones.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  
  // idUsuarioActual = JSON.parse(localStorage.getItem('user')).uid;
  idUsuarioActual= 'hola'
  eventos: any[] = [];
  notificaciones: any[] = [];
  constructor(private menuCtrl: MenuController,
              private eventosService: EventosService,
              public notificacionesService: NotificacionesService) {}

  ngOnInit(): void {
    this.menuCtrl.enable(true, 'first');
      this.obtenerEventosActuales();
  }
  obtenerEventosActuales() {
    this.eventosService.obtenerRLEvenUsu(this.idUsuarioActual)
    .subscribe((data) => {
      this.eventos = data;
    });
  }
}
