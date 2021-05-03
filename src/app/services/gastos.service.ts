import { Injectable } from '@angular/core';
import {  HttpClient, HttpHeaders } from '@angular/common/http';
import { GastoInterface } from '../components/gastos/models/interface';
import { map } from 'rxjs/Operators';
import { GastosModel } from '../components/gastos/models/gastos.model';

@Injectable({
  providedIn: 'root'
})
export class GastosService {
  private apiUrl: string ="https://localhost:44326/api/Gastos"

  constructor(private _http: HttpClient) {}

  getBuscar(descripcion) {
    let headers = new HttpHeaders({ 'content-type': 'application/json' })
    return this._http.get<GastoInterface>(`https://localhost:44326/api/Gastos?Descripcion=${descripcion}`,  {headers: headers})
    .pipe(
      map( resp => {
          return resp.data.map(gast => GastosModel.gastoJson(gast))
        }
    ))
  }

  getAllGastos() {
    let headers = new HttpHeaders({ 'content-type': 'application/json' })
    return this._http.get<GastoInterface>(this.apiUrl,  {headers: headers})
    .pipe(
      map( resp => {
          return resp.data.map(gast => GastosModel.gastoJson(gast))
        }
    ))
  }

  addGastos(gastos: GastosModel){
    let headers = new HttpHeaders({ 'content-type': 'application/json' })
    return this._http.post<GastosModel>(this.apiUrl, JSON.stringify(gastos), {headers: headers})
  }
  putGastos(gastos: GastosModel){
    let headers = new HttpHeaders({ 'content-type': 'application/json' })
    return this._http.put<GastosModel>(this.apiUrl + '/' + gastos.id, JSON.stringify(gastos), {headers: headers})
  }
  deleteGastos(id: GastosModel){
    let headers = new HttpHeaders({ 'content-type': 'application/json' })
    return this._http.delete<GastosModel>(this.apiUrl + '/' + id, {headers: headers})
  }




}
