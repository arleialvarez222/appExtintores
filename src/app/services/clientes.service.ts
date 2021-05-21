import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ClienteModel } from '../components/clientes/models/clienteModel';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private apiEndpoint = `${environment.apiUrl}/api`;

  constructor(private _http: HttpClient) { }

  consultarCliente(){
    let headers = new HttpHeaders({'content-type': 'application/json'})
    return this._http.get<ClienteModel>(`${this.apiEndpoint}/Clientes`, {headers: headers})
  }

  guardarCliente(cliente: ClienteModel){
    let headers = new HttpHeaders({'content-type': 'application/json'})
    return this._http.post<ClienteModel>(`${this.apiEndpoint}/Clientes`, {...cliente}, {headers: headers})
  }

  editarCliente(cliente: ClienteModel){
    let headers = new HttpHeaders({'content-type': 'application/json'})
    return this._http.put<ClienteModel>(`${this.apiEndpoint}/Clientes/${cliente?.id}`, {...cliente}, {headers: headers})
  }

  eliminarClientes(id: ClienteModel){
    let headers = new HttpHeaders({'content-type': 'application/json'})
    return this._http.delete<ClienteModel>(`${this.apiEndpoint}/Clientes/${id}`, {headers: headers})
  }
}
