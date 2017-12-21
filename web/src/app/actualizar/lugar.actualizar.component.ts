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
  lugar = new Lugares('','','','',null);
  actualizado = false;
  constructor(private route: ActivatedRoute, private lugaresServicio: LugaresServicioComponent){
    this.id = this.route.snapshot.params['id'];
    this.lugaresServicio.buscarPorId(this.id)
      .then((lugar)=>{
        this.lugar = lugar;
        console.log('EL lugar es: ', lugar);
      })
  }

  actualizarLugar(lugar: Lugares){
    this.lugaresServicio.actualizarLugar(lugar)
      .subscribe(res =>{
        console.log('Lugar editado');
        this.actualizado = true;
      },error => {
        console.log('Error mira ', error);
        this.actualizado = false;
      })
  }

  cerrar(){
    this.actualizado = false;
  }
}
