import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EmpresaModel } from '../components/empresa/models/modelEmpresa';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private apiEndpoint = `${environment?.apiUrl}/api`;

  constructor( private _http: HttpClient ) { }

  consultarEmpresa(){
    return this._http.get<EmpresaModel>(`${this?.apiEndpoint}/Empresas`);
  }

  guardarEmpresa(empresa: EmpresaModel){
    return this._http.post<EmpresaModel>(`${this?.apiEndpoint}/Empresas`,JSON.stringify(empresa));
  }

  editarEmpresa(empresa: EmpresaModel){
    return this._http.put<EmpresaModel>(`${this?.apiEndpoint}/Empresas/${empresa?.idEmpresa}`, JSON.stringify(empresa));
  }

  eliminarEmpresa(id){
    return this._http.delete<EmpresaModel>(`${this?.apiEndpoint}/Empresas/${id}`);
  }

}
