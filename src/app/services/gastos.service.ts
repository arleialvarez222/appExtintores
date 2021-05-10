import { Injectable } from '@angular/core';
import {  HttpClient, HttpHeaders } from '@angular/common/http';
import { GastosModel } from '../components/gastos/models/gastos.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GastosService {
  private apiEndpoint = `${environment.apiUrl}/api`;

  constructor(private _http: HttpClient) {}

  getBuscar(descripcion) {
    let headers = new HttpHeaders({ 'content-type': 'application/json' })
    return this._http.get<GastosModel>(`${this.apiEndpoint}/Gastos?Descripcion=${descripcion}`, {headers: headers})
  }

  getAllGastos() {
    let headers = new HttpHeaders({ 'content-type': 'application/json' })
    return this._http.get<GastosModel>(`${this.apiEndpoint}/Gastos`,  {headers: headers})
  }

  addGastos(gastos: GastosModel){
    let headers = new HttpHeaders({ 'content-type': 'application/json' })
    return this._http.post<GastosModel>(`${this.apiEndpoint}/Gastos`, JSON.stringify(gastos), {headers: headers})
  }
  putGastos(gastos: GastosModel){
    let headers = new HttpHeaders({ 'content-type': 'application/json' })
    return this._http.put<GastosModel>(`${this.apiEndpoint}/Gastos/${gastos?.id}`, JSON.stringify(gastos), {headers: headers})
  }
  deleteGastos(id: GastosModel){
    let headers = new HttpHeaders({ 'content-type': 'application/json' })
    return this._http.delete<GastosModel>(`${this.apiEndpoint}/Gastos/${id}`, {headers: headers})
  }




}
