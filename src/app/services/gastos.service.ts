import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { GastosModel } from '../components/gastos/models/gastos.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GastosService {

  private apiEndpoint = `${environment.apiUrl}/api`;

  constructor(private _http: HttpClient) {}

  getBuscar(descripcion) {
    return this._http.get<GastosModel>(`${this.apiEndpoint}/Gastos?Descripcion=${descripcion}`);
  }

  getAllGastos() {
    return this._http.get<GastosModel>(`${this.apiEndpoint}/Gastos`)
  }

  addGastos(gastos: GastosModel){
    return this._http.post<GastosModel>(`${this.apiEndpoint}/Gastos`, JSON.stringify(gastos));
  }

  putGastos( gastos: GastosModel){
    return this._http.put<GastosModel>(`${this.apiEndpoint}/Gastos/${gastos?.idGastos}`, JSON.stringify(gastos));
  }

  deleteGastos(idGastos: GastosModel){
    return this._http.delete<GastosModel>(`${this.apiEndpoint}/Gastos/${idGastos}`);
  }


}
