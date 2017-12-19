import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {LugaresServicioComponent} from "../servicios/lugares.servicio.component";
import {Lugares} from "../clases/lugar.clase";

@Component({
  selector: 'app-editarLugar',
  templateUrl: './lugar.actualizar.component.html',
  styleUrls: ['./lugar.actualizar.component.css']
})

export class LugarActualizarComponent {
  id = null;
  lugar: Lugares = null;
  constructor(private route: ActivatedRoute){
    this.id = this.route.snapshot.params['id'];
  }
}
