import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EmployeeModels } from '../components/empleados/models/model-empleado';
import { EmpleadoInterface } from '../components/empleados/models/interface-empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private apiUrl: string = "https://localhost:44326/api/Empleados"
  constructor(private _http: HttpClient) {
  }

  buscarEmpleado(nombre){
    let headers = new HttpHeaders({'content-type': 'application/json'})
    return this._http.get<EmpleadoInterface>(`https://localhost:44326/api/Empleados?Nombres=${nombre}`, {headers: headers})
  }

  getAllEmpleado(){
    let headers = new HttpHeaders({'content-type': 'application/json'})
    return this._http.get<EmpleadoInterface>(this.apiUrl, {headers: headers})
  }

  addEmployee$(empleado){
    let headers = new HttpHeaders({'content-type': 'application/json'})
    return this._http.post<EmpleadoInterface>(this.apiUrl,JSON.stringify(empleado), {headers: headers})
  }

  editEmployee(empleado){
    let headers = new HttpHeaders({ 'content-type': 'application/json' })
    return this._http.put<EmpleadoInterface>(this.apiUrl + '/' + empleado.id, JSON.stringify(empleado), {headers: headers})
  }

  deleteEmployees(id){
    let headers = new HttpHeaders({ 'content-type': 'application/json' })
    return this._http.delete<EmpleadoInterface>(this.apiUrl + '/' + id, {headers: headers})
  }
}
