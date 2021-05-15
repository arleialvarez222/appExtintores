import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProductosModel } from '../components/productos/modelos/productoModel';
import { TipoModel, PesoModel } from '../components/extintor/models/tipo-interface';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiRuta = `${environment.apiUrl}/api`;

  constructor(private _http: HttpClient) { }

  busquedaProducto(tipoProducto){
    let headers = new HttpHeaders({'content-type': 'application/json'})
    return this._http.get<ProductosModel>(`${this.apiRuta}/Productos?TipoProducto=${tipoProducto}`, {headers : headers})
  }

  consultarProducto(){
    let headers = new HttpHeaders({'content-type': 'application/json'})
    return this._http.get<ProductosModel>(`${this.apiRuta}/Productos`, {headers : headers})
  }

  guardarProducto(producto: ProductosModel){
    let headers = new HttpHeaders({'content-type': 'application/json'})
    return this._http.post<ProductosModel>(`${this.apiRuta}/Productos`, JSON.stringify(producto), {headers : headers})
  }

  editarProducto(producto: ProductosModel){
    let headers = new HttpHeaders({'content-type': 'application/json'})
    return this._http.put<ProductosModel>(`${this.apiRuta}/Productos/${producto?.id}`, JSON.stringify(producto), {headers : headers})
  }

  eliminarProducto(id: ProductosModel){
    let headers = new HttpHeaders({'content-type': 'application/json'})
    return this._http.delete<ProductosModel>(`${this.apiRuta}/Productos/${id}`, {headers : headers})
  }

}
