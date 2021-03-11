import { Component, Input, OnInit } from '@angular/core';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-mostrar-eventos-activos',
  templateUrl: './mostrar-eventos-activos.component.html',
  styleUrls: ['./mostrar-eventos-activos.component.scss'],
})
export class MostrarEventosActivosComponent implements OnInit {
  @Input() producto: any;
  EventosActivosUsuario: any[] = [];
  UsuarioActual = JSON.parse(localStorage.getItem('user')).uid;
  eventosAsignados: any[] = [];
  constructor(private eventosService: EventosService) { }

  ngOnInit() {
    this.eventosService.obtenerEventosUsuario(this.UsuarioActual).subscribe((data)=> {
      data.forEach((element: any) => {
        this.eventosService.comprobarProductoEvento(this.producto.idProducto,element.idEvento).subscribe((data)=> {
          if (data.length===0){
            this.EventosActivosUsuario.push(element);
          }
        })
      });
    })
  }

  test(evento: any,indice: number) {
    this.eventosService.crearProductoEvento2(this.producto.idProducto,evento.idEvento,this.producto.nombre,this.producto.precio,this.producto.link,this.producto.descripcion,this.producto.imagen1,this.producto.imagen2,this.producto.imagen3,this.UsuarioActual).then(()=>{
      this.eventosAsignados.push(indice);
    })
    .catch((err)=> {
      alert(err)
    })
  }
}
