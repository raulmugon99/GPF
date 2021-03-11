import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {

  mensaje: string;
  constructor( private navParams: NavParams) { }

  ngOnInit() {
    this.mensaje = this.navParams.data.mensaje;
  }
  
}
