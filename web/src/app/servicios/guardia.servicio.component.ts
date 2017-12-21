import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {AutentificacionServicioComponent} from "./Autentificacion.servicio.component";

@Injectable()

export class GuardiaServicioComponent implements CanActivate {
  token ='';
  constructor(private autentificacioServicio: AutentificacionServicioComponent,
              private router: Router){}


  canActivate() {
    if ( localStorage.getItem('token') ) {
      this.autentificacioServicio.logeado = true;
      return true;

    }else {
      this.router.navigate(['']);
      this.autentificacioServicio.logeado = false;
      return false;
    }

  }
}
