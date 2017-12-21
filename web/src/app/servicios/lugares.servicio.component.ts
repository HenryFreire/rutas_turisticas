import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import urljoin from 'url-join';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {Lugares} from "../clases/lugar.clase";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs/Observable";
@Injectable()

export class LugaresServicioComponent {
  private httpUrl: string;
  constructor(private _http: Http) {
    this.httpUrl = urljoin(environment.apiUrl, 'Lugar');
  }

  getLugares(): Promise<Lugares[] >{
    const headers = new Headers({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')})
    return this._http.get(this.httpUrl,{headers})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  buscarPorId(id) : Promise<Lugares>{
    const url = urljoin(this.httpUrl,'buscarPorId?id=' + id);
    const headers = new Headers({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')})
    return this._http.get(url,{headers})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  actualizarLugar(lugar:Lugares){
    const url = urljoin(this.httpUrl,'actualizarLugar');
    const headers = new Headers({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')})
    return this._http.post(url,lugar,{headers})
      .map((response: Response) => response.json())
      .catch((error: Response)=> Observable.throw(error.json()))
  }

  eliminarLugar(lugar: Lugares) {
    const body = JSON.stringify(lugar);
    const url = urljoin(this.httpUrl,'eliminar');
    console.log(url);
    const headers = new Headers({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')})
    return this._http.post(url,body,{headers})
      .map((response: Response) => response.json())
      .catch((error: Response)=> Observable.throw(error.json()))
  }


  handleError(error: any) {
    const errMsg = error.message ? error.message :
      error.status ?  `${error.status} - ${error.statusText}` : `Server error`;
    console.log(errMsg);
  }


}
