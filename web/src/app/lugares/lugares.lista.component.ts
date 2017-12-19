import {Component} from "@angular/core";
import {LugaresServicioComponent} from "../servicios/lugares.servicio.component";
import {Lugares} from "../clases/lugar.clase";

@Component({
  selector: 'app-listaLugares',
  templateUrl: './lugares.lista.component.html',
  styleUrls: ['./lugares.lista.component.css'],
  providers: [LugaresServicioComponent]
})

export class LugaresListaComponent {
  // Cordenadas de inicio de google map
  lat: number = -0.274252;
  lng: number = -78.55282649999999;
  lugares: Lugares[];
  p: number = 1;
  nombreFilter: string;
  constructor(private lugarServicio: LugaresServicioComponent){
    this.lugarServicio.getLugares()
      .then((lugares)=> {
        this.lugares = lugares;
        console.log(this.lugares)
      })
  }
}
