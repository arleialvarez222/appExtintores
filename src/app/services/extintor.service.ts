import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TipoModel, PesoModel} from '../components/extintor/models/tipo-interface';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ExtintorService {

  private apiEndpoint = `${environment?.apiUrl}/api`;

  constructor(private _http: HttpClient) { }

  mostrarTipo(){
    return this._http.get<TipoModel>(`${this?.apiEndpoint}/TipoExtintores`);
  }

  guardarTipo(tipo:TipoModel){
    return this._http.post<TipoModel>(`${this?.apiEndpoint}/TipoExtintores`, JSON.stringify(tipo));
  }

  editarTipo(tipo: TipoModel){
    return this._http.put<TipoModel>(`${this?.apiEndpoint}/TipoExtintores/${tipo?.idTipoExtintor}`, JSON.stringify(tipo));
  }

  eliminarTipo(idTipoExtintor: TipoModel){

    return this._http.delete<TipoModel>(`${this?.apiEndpoint}/TipoExtintores/${idTipoExtintor}`);
  }



  mostrarPeso(){
    return this._http.get<PesoModel>(`${this?.apiEndpoint}/PesoExtintores`);
  }

  guardarPeso(peso: PesoModel){
    return this._http.post<PesoModel>(`${this?.apiEndpoint}/PesoExtintores`, JSON.stringify(peso));
  }

  editarPeso(peso: PesoModel){
    return this._http.put<PesoModel>(`${this.apiEndpoint}/PesoExtintores/${peso?.idPesoExtintor}`, JSON.stringify(peso));
  }

  eliminarPeso(idPesoExtintor: PesoModel){
    return this._http.delete<PesoModel>(`${this?.apiEndpoint}/PesoExtintores/${idPesoExtintor}`);
  }
}
