import { Injectable } from '@angular/core';
import {  HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GastosService {
  private apiUrl: string ="https://localhost:44326/api/Gastos"
  constructor(private _http: HttpClient) {}

  getAllGastos() {
    let headers = new HttpHeaders({ 'content-type': 'application/json' })
    return this._http.get(this.apiUrl, {headers: headers})
  }

  addGastos(gastos){
    let headers = new HttpHeaders({ 'content-type': 'application/json' })
    return this._http.post(this.apiUrl, JSON.stringify(gastos), {headers: headers})
  }
  putGastos(gastos){
    let headers = new HttpHeaders({ 'content-type': 'application/json' })
    return this._http.put(this.apiUrl + '/' + gastos.id, JSON.stringify(gastos), {headers: headers})
  }
  deleteGastos(id){
    let headers = new HttpHeaders({ 'content-type': 'application/json' })
    return this._http.delete(this.apiUrl + '/' + id, {headers: headers})
  }




}
