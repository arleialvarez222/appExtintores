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

  busacandoInventario(tipo){
    let headers = new HttpHeaders({'content-type': 'application/json'})
    return this._http.get<InventarioModel>(`${this.apiRuta}/Inventarios?Tipo=${tipo}`, {headers : headers})
  }

  verInventario(){
    let headers = new HttpHeaders({'content-type': 'application/json'})
    return this._http.get<InventarioModel>(`${this.apiRuta}/Inventarios`, {headers : headers})
  }

  guardarInventario(inventario: InventarioModel){
    let headers = new HttpHeaders({'content-type': 'application/json'})
    return this._http.post<InventarioModel>(`${this.apiRuta}/Inventarios`, {...inventario}, {headers : headers})
  }

  editarInventario(inventario: InventarioModel){
    let headers = new HttpHeaders({'content-type': 'application/json'})
    return this._http.put<InventarioModel>(`${this.apiRuta}/Inventarios/${inventario?.id}`, {...inventario}, {headers : headers})
  }

  eliminarInventario(id: InventarioModel){
    let headers = new HttpHeaders({'content-type': 'application/json'})
    return this._http.delete<InventarioModel>(`${this.apiRuta}/Inventarios/${id}`, {headers : headers})
  }

}
