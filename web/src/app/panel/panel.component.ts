import {Component} from "@angular/core";
import {AutentificacionServicioComponent} from "../servicios/Autentificacion.servicio.component";

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html'
})

export class PanelComponent {
  constructor(private autentificacionServicio: AutentificacionServicioComponent){

  }

  salir(){
    this.autentificacionServicio.desLogearse();
  }

}