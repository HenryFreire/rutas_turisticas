import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import urljoin from 'url-join';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {Usuario} from "../clases/usuario";
import {Observable} from "rxjs/Observable";

@Injectable()

export class AutentificacionServicioComponent {
  private httpUrl: string;
  constructor(private http: Http, private router: Router ){
    this.httpUrl = urljoin(environment.apiUrl, 'Usuario');
  }
  logeado = false;

  login(usuario: Usuario) {
    const body = JSON.stringify(usuario);
    const url = urljoin(this.httpUrl, 'login');
    console.log('mi url es: ', url);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(url,body, { headers })
      .map((response: Response) => {
      this.logeado = true;
      this.router.navigate(['panel/lugares']);
      console.log('logeado : ', this.logeado);
        return response.json();
      })
      .catch((error: Response) => {
      this.logeado = false;
        console.log('logeado : ', this.logeado);
        return Observable.throw(error.json());
      });
  }


    isLogged(){
      return this.logeado;
    }

  desLogearse() {
    localStorage.clear();
    this.router.navigate(['']);
    location.reload()
  }


}
