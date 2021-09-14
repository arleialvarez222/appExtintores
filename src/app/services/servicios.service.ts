import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ServiciosModel } from '../components/factura/modelos/servicioModel';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  private apiEndpoint = `${environment.apiUrl}/api`;

  constructor(private _http: HttpClient) { }

  consultarServicios (){
    return this._http.get<ServiciosModel>(`${this?.apiEndpoint}/Servicios`);
  }

  consultarPorId (idServicios){
    return this._http.get(`${this?.apiEndpoint}/Servicios/${idServicios}`);
  }

  agregarServicio(servicio: ServiciosModel){
    return this._http.post<ServiciosModel>(`${this.apiEndpoint}/Servicios`, JSON.stringify(servicio));

  }

  editarServicio(servicios: ServiciosModel){
    return this._http.put<ServiciosModel>(`${this.apiEndpoint}/Servicios/${servicios?.idServicios}`, JSON.stringify(servicios));

  }

  eliminarServicios (idServicio){
    return this._http.delete<ServiciosModel>(`${this?.apiEndpoint}/Servicios/${idServicio}`);
  }


}
