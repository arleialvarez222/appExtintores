import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CreditoModel } from '../components/creditos/models/creditoModel';

@Injectable({
  providedIn: 'root'
})
export class CreditosService {

  private apiEndpoint = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) { }

  consultarCredito(){
    return this.http.get<CreditoModel>(`${this.apiEndpoint}/Creditos`);
  }

  agregarAbono(abono: CreditoModel){
    return this.http.post<CreditoModel>(`${this.apiEndpoint}/Creditos`, JSON.stringify(abono));
  }

}
