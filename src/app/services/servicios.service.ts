import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  private apiEndpoint = `${environment.apiUrl}/api`;

  constructor(private _http: HttpClient) { }

  consultarServicios (){
    return this._http.get(`${this?.apiEndpoint}/Servicios`);
  }

  eliminarServicios (idServicio){
    return this._http.delete(`${this?.apiEndpoint}/Servicios/${idServicio}`);
  }


}
