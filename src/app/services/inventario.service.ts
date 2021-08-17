import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { InventarioModel } from '../components/almacen/modelos/invantarioModel';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  private apiRuta = `${environment?.apiUrl}/api`;

  constructor(private _http: HttpClient) { }

  busacandoInventario(tipo){
    return this._http.get<InventarioModel>(`${this?.apiRuta}/Inventarios?Tipo=${tipo}`);
  }

  verInventario(){
    return this._http.get<InventarioModel>(`${this?.apiRuta}/Inventarios`);
  }

  guardarInventario(inventario: InventarioModel){
    return this._http.post<InventarioModel>(`${this?.apiRuta}/Inventarios`, {...inventario});
  }

  editarInventario(inventario: InventarioModel){
    return this._http.put<InventarioModel>(`${this?.apiRuta}/Inventarios/${inventario?.idInventario}`, {...inventario});
  }

  eliminarInventario(id: InventarioModel){
    return this._http.delete<InventarioModel>(`${this?.apiRuta}/Inventarios/${id}`);
  }

}
