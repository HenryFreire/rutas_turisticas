import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {LugaresServicioComponent} from "../servicios/lugares.servicio.component";
import {ToasterService} from "angular2-toaster/src/toaster.service";
import {Lugares} from "../clases/lugar.clase";

@Component({
  selector: 'app-ver-lugar',
  templateUrl: './ver.lugar.component.html',
  styleUrls: ['./ver.lugar.component.css']
})

export class VerLugarComponent {
  id = null;
  lugar = new Lugares('','','','',null);
  constructor(private route: ActivatedRoute, private lugaresServicio: LugaresServicioComponent, private mensajeria: ToasterService){
    this.id = this.route.snapshot.params['id'];
    this.lugaresServicio.buscarPorId(this.id)
      .then((lugar)=>{
        this.lugar = lugar;
        console.log('EL lugar es: ', lugar);
      })
  }
}
