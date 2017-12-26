import {Component} from "@angular/core";
import {Usuario} from "../clases/usuario";
import {AutentificacionServicioComponent} from "../servicios/Autentificacion.servicio.component";
import {ToasterService} from "angular2-toaster/src/toaster.service";

@Component({
  selector:'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class  LoginComponent {
  usuario = new Usuario('','');
  msg = false;
  constructor(private autentificacionServicio: AutentificacionServicioComponent, private mensajeria: ToasterService){}
  login() {
    console.log('Usuario ', this.usuario);
    this.autentificacionServicio.login(this.usuario)
      .subscribe(res => {
        console.log('ok ', res)
        localStorage.setItem("token", res.token);
        localStorage.setItem("email", res.email);
        this.mensajeria.pop('success', 'Ok','Bienvenido');
      },error => {
        console.log(error);
        this.mensajeria.pop('error', 'Atención','Credenciales incorrectas');
      })
  }


}
