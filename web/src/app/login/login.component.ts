import {Component} from "@angular/core";
import {Usuario} from "../clases/usuario";
import {AutentificacionServicioComponent} from "../servicios/Autentificacion.servicio.component";

@Component({
  selector:'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class  LoginComponent {
  usuario = new Usuario('','');
  msg = false;
  msgError = false;
  constructor(private autentificacionServicio: AutentificacionServicioComponent){}
  login() {
    console.log('Usuario ', this.usuario);
    this.autentificacionServicio.login(this.usuario)
      .subscribe(res => {
        console.log('ok ', res)
        localStorage.setItem("token", res.token);
        localStorage.setItem("email", res.email);
      },error => {
        this.msgError =true;
        this.msg = error.msg;
      })
  }

  cerrar(){
    this.msgError = false
  }
}
