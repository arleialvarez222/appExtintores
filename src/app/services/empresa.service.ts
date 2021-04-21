import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  public apiUrl: string = "https://localhost:44326/api/Empresas"

  constructor( private _http: HttpClient ) { }

consultarEmpresa(){
  let headers = new HttpHeaders({ 'content-type': 'application/json' })
  return this._http.get(this.apiUrl,  {headers: headers})
}

}
