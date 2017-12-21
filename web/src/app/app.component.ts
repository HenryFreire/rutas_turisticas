import {Component, OnInit} from '@angular/core';
import {AutentificacionServicioComponent} from "./servicios/Autentificacion.servicio.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  logeado = false;
  constructor(private autentificacionServicio: AutentificacionServicioComponent){
    this.logeado = this.autentificacionServicio.isLogged()
  }
  ngOnInit(){

  }
}
