import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {LugaresServicioComponent} from "../servicios/lugares.servicio.component";
import {Lugares} from "../clases/lugar.clase";
import {ToasterService} from "angular2-toaster/src/toaster.service";

@Component({
  selector: 'app-editarLugar',
  templateUrl: './lugar.actualizar.component.html',
  styleUrls: ['./lugar.actualizar.component.css']
})

export class LugarActualizarComponent {
  id = null;
  lugar = new Lugares('','','','',null);
  constructor(private route: ActivatedRoute, private lugaresServicio: LugaresServicioComponent, private mensajeria: ToasterService, private router: Router){
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
        this.mensajeria.pop('success', 'Ok','Actualizado');
      },error => {
        console.log('Error mira ', error);
        if(error.status == 403){
          localStorage.clear();
          this.router.navigate(['']);
          location.reload()
        }else{
          this.mensajeria.pop('error', 'Error','Intentelo luego');
        }
      })
  }


}
