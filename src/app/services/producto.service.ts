import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProductosModel } from '../components/productos/modelos/productoModel';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiRuta = `${environment?.apiUrl}/api`;

  constructor(private _http: HttpClient) { }

  busquedaProducto(tipoProducto){
    return this._http.get<ProductosModel>(`${this?.apiRuta}/Productos?TipoProducto=${tipoProducto}`);
  }

  consultarProducto(){
    return this._http.get<ProductosModel>(`${this?.apiRuta}/Productos`);
  }

  guardarProducto(producto: ProductosModel){
    return this._http.post<ProductosModel>(`${this?.apiRuta}/Productos`, JSON.stringify(producto));
  }

  editarProducto(producto: ProductosModel){
    return this._http.put<ProductosModel>(`${this?.apiRuta}/Productos/${producto?.idProductos}`, JSON.stringify(producto));
  }

  eliminarProducto(id: ProductosModel){
    return this._http.delete<ProductosModel>(`${this?.apiRuta}/Productos/${id}`);
  }

}
