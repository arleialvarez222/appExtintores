import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EmpresaModel } from '../components/empresa/models/modelEmpresa';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private apiEndpoint = `${environment.apiUrl}/api`;

  constructor( private _http: HttpClient ) { }

  consultarEmpresa(){
    let headers = new HttpHeaders({ 'content-type': 'application/json' })
    return this._http.get<EmpresaModel>(`${this.apiEndpoint}/Empresas`,  {headers: headers})
  }

  guardarEmpresa(empresa: EmpresaModel){
    let headers = new HttpHeaders({ 'content-type': 'application/json' })
    return this._http.post<EmpresaModel>(`${this.apiEndpoint}/Empresas`,JSON.stringify(empresa),  {headers: headers})
  }

  editarEmpresa(empresa: EmpresaModel){
    let headers = new HttpHeaders({ 'content-type': 'application/json' })
    return this._http.put<EmpresaModel>(`${this.apiEndpoint}/Empresas/${empresa.id}`, JSON.stringify(empresa),  {headers: headers})
  }

  eliminarEmpresa(id){
    let headers = new HttpHeaders({ 'content-type': 'application/json' })
    return this._http.delete<EmpresaModel>(`${this.apiEndpoint}/Empresas/${id}`, {headers: headers})
  }

}
