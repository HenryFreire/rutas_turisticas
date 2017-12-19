import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import urljoin from 'url-join';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {Lugares} from "../clases/lugar.clase";
import {environment} from "../../environments/environment";
@Injectable()

export class LugaresServicioComponent {
  private httpUrl: string;
  constructor(private _http: Http) {
    this.httpUrl = urljoin(environment.apiUrl, 'Lugar');
  }

  getLugares(): Promise<Lugares[] >{
    return this._http.get(this.httpUrl)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  buscarPorId(id) : Promise<Lugares>{
    const url = urljoin(this.httpUrl,'buscarPorId?id=', id);
    return this._http.get(url)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }


  handleError(error: any) {
    const errMsg = error.message ? error.message :
      error.status ?  `${error.status} - ${error.statusText}` : `Server error`;
    console.log(errMsg);
  }


}
