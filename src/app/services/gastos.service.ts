import { Injectable } from '@angular/core';
import {  HttpClient, HttpHeaders } from '@angular/common/http';
import { GastosModel } from '../components/gastos/models/gastos.model';
import { environment } from 'src/environments/environment';

import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class GastosService {
  headers:HttpHeaders = new HttpHeaders({"Content-Type": "application/json"});
  private apiEndpoint = `${environment.apiUrl}/api`;

  constructor(private _http: HttpClient,
              private authService: AuthService) {}

  getBuscar(descripcion) {
    return this._http.get<GastosModel>(`${this.apiEndpoint}/Gastos?Descripcion=${descripcion}`, {headers: this?.headers})
  }

  getAllGastos() {
    return this._http.get<GastosModel>(`${this.apiEndpoint}/Gastos`,  {headers: this?.headers})
  }

  addGastos(gastos: GastosModel){
    return this._http.post<GastosModel>(`${this.apiEndpoint}/Gastos`, JSON.stringify(gastos), {headers: this?.headers})
  }
  putGastos(gastos: GastosModel){
    return this._http.put<GastosModel>(`${this.apiEndpoint}/Gastos/${gastos?.id}`, JSON.stringify(gastos), {headers: this?.headers})
  }
  deleteGastos(id: GastosModel){
    return this._http.delete<GastosModel>(`${this.apiEndpoint}/Gastos/${id}`, {headers: this?.headers})
  }




}
