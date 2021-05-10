import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TipoModel, PesoModel} from '../components/extintor/models/tipo-interface';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ExtintorService {

  private apiEndpoint = `${environment.apiUrl}/api`;

  constructor(private _http: HttpClient) { }

  mostrarTipo(){
    let headers = new HttpHeaders({'content-type': 'application/json'})
    return this._http.get<TipoModel>(`${this.apiEndpoint}/TipoExtintores`, {headers: headers})
  }

  guardarTipo(tipo:TipoModel){
    let headers = new HttpHeaders({'content-type': 'application/json'})
    return this._http.post<TipoModel>(`${this.apiEndpoint}/TipoExtintores`, JSON.stringify(tipo), {headers: headers})
  }

  editarTipo(tipo: TipoModel){
    let headers = new HttpHeaders({'content-type': 'application/json'})
    return this._http.put<TipoModel>(`${this.apiEndpoint}/TipoExtintores/${tipo?.id}`, JSON.stringify(tipo), {headers: headers})
  }

  eliminarTipo(id: TipoModel){
    let headers = new HttpHeaders({'content-type': 'application/json'})
    return this._http.delete<TipoModel>(`${this.apiEndpoint}/TipoExtintores/${id}`, {headers: headers})
  }



  mostrarPeso(){
    let headers = new HttpHeaders({'content-type': 'application/json'})
    return this._http.get<PesoModel>(`${this.apiEndpoint}/PesoExtintores`, {headers: headers})
  }

  guardarPeso(peso: PesoModel){
    let headers = new HttpHeaders({'content-type': 'application/json'})
    return this._http.post<PesoModel>(`${this.apiEndpoint}/PesoExtintores`, JSON.stringify(peso), {headers: headers})
  }

  editarPeso(peso: PesoModel){
    let headers = new HttpHeaders({'content-type': 'application/json'})
    return this._http.put<PesoModel>(`${this.apiEndpoint}/PesoExtintores/${peso?.id}`, JSON.stringify(peso), {headers: headers})
  }

  eliminarPeso(id: PesoModel){
    let headers = new HttpHeaders({'content-type': 'application/json'})
    return this._http.delete<PesoModel>(`${this.apiEndpoint}/PesoExtintores/${id}`, {headers: headers})
  }
}
