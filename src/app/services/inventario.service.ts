import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { InventarioModel } from '../components/almacen/modelos/invantarioModel';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  private apiRuta = `${environment.apiUrl}/api`;

  constructor(private _http: HttpClient) { }

  verinventario(){
    let headers = new HttpHeaders({'content-type': 'application/json'})
    return this._http.get<InventarioModel>(`${this.apiRuta}/Inventarios`, {headers : headers})
  }

}
