import {Component} from "@angular/core";
import {LugaresServicioComponent} from "../servicios/lugares.servicio.component";
import {Lugares} from "../clases/lugar.clase";
import {AutentificacionServicioComponent} from "../servicios/Autentificacion.servicio.component";
import {ToasterService} from "angular2-toaster/src/toaster.service";
import {Router} from "@angular/router";

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
  logeado= false;
  p: number = 1;
  nombreFilter: string;
  constructor(private lugarServicio: LugaresServicioComponent, private autentificacionServicio: AutentificacionServicioComponent, private mensajeria: ToasterService, private router: Router){
    this.lugarServicio.getLugares()
      .then((lugares)=> {
        this.lugares = lugares;
      })
  }

  eliminar(lugar : Lugares){
    this.lugarServicio.eliminarLugar(lugar)
      .subscribe(res => {
        this.lugarServicio.getLugares()
          .then((lugares)=> {
            this.lugares = lugares;
            this.mensajeria.pop('success', 'Ok','Lugar eliminado');
          })
      },error => {
        console.log('Ocurrio un error ', error);
        if(error.status == 403){
          localStorage.clear();
          this.router.navigate(['']);
          location.reload();

        }else{
          this.mensajeria.pop('error', 'Error','Intentelo luego');
        }
      })
  }
}
