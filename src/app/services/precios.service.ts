import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { PreciosModel } from '../components/precios/models/precio-models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PreciosService {
  private apiEndpoint = `${environment.apiUrl}/api`;

  constructor(private _http: HttpClient) { }

  verProducto(){
    let headers = new HttpHeaders({'content-type': 'application/json'})
    return this._http.get(`${this.apiEndpoint}/Productos`, {headers: headers})
  }

  busquedaPrecio(descripcion){
    let headers = new HttpHeaders({'content-type': 'application/json'})
    return this._http.get<PreciosModel>(`${this.apiEndpoint}/Precios?Descripcion=${descripcion}`, {headers: headers})
  }

  verPrecio(){
    let headers = new HttpHeaders({'content-type': 'application/json'})
    return this._http.get<PreciosModel>(`${this.apiEndpoint}/Precios`, {headers: headers})
  }

  guardarPrecio(precios: PreciosModel){
    let headers = new HttpHeaders({'content-type': 'application/json'})
    return this._http.post<PreciosModel>(`${this.apiEndpoint}/Precios`, JSON.stringify(precios), {headers: headers})
  }

  editarPrecio(precios: PreciosModel){
    let headers = new HttpHeaders({'content-type': 'application/json'})
    return this._http.put<PreciosModel>(`${this.apiEndpoint}/Precios/${precios?.id}`, JSON.stringify(precios), {headers: headers})
  }

  eliminarPrecio(id: PreciosModel){
    let headers = new HttpHeaders({'content-type': 'application/json'})
    return this._http.delete<PreciosModel>(`${this.apiEndpoint}/Precios/${id}`, {headers: headers})
  }
}
