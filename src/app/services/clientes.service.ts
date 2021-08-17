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
    return this._http.get<ClienteModel>(`${this?.apiEndpoint}/Clientes`);
  }

  guardarCliente(cliente: ClienteModel){
    return this._http.post<ClienteModel>(`${this?.apiEndpoint}/Clientes`, {...cliente});
  }

  editarCliente(cliente: ClienteModel){
    return this._http.put<ClienteModel>(`${this?.apiEndpoint}/Clientes/${cliente?.idCliente}`, {...cliente});
  }

  eliminarClientes(id: ClienteModel){
    return this._http.delete<ClienteModel>(`${this?.apiEndpoint}/Clientes/${id}`);
  }
}
