import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PreciosModel } from '../components/precios/models/precio-models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PreciosService {
  private apiEndpoint = `${environment?.apiUrl}/api`;

  constructor(private _http: HttpClient) { }

  verProducto(){
    return this._http.get(`${this?.apiEndpoint}/Productos`);
  }

  busquedaPrecio(descripcion){
    return this._http.get<PreciosModel>(`${this?.apiEndpoint}/Precios?Descripcion=${descripcion}`);
  }

  verPrecio(){
    return this._http.get<PreciosModel>(`${this?.apiEndpoint}/Precios`);
  }

  guardarPrecio(precios: PreciosModel){
    return this._http.post<PreciosModel>(`${this?.apiEndpoint}/Precios`, JSON.stringify(precios));
  }

  editarPrecio(precios: PreciosModel){
    return this._http.put<PreciosModel>(`${this.apiEndpoint}/Precios/${precios?.idPrecios}`, JSON.stringify(precios));
  }

  eliminarPrecio(id: PreciosModel){
    return this._http.delete<PreciosModel>(`${this?.apiEndpoint}/Precios/${id}`);
  }
}
