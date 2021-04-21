import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EmployeeInterface } from '../components/empleados/interface-empleado';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private apiUrl: string = "https://localhost:44326/api/Empleados"
  constructor(private _http: HttpClient) {
   }

  getAllEmployeeSearch(nombre){
    let headers = new HttpHeaders({'content-type': 'application/json'})
    return this._http.get(this.apiUrl+ '/' + nombre, {headers: headers})
  }

  getAllEmpleado(){
    let headers = new HttpHeaders({'content-type': 'application/json'})
    return this._http.get(this.apiUrl, {headers: headers})
  }

  addEmployee$(empleado){
    let headers = new HttpHeaders({'content-type': 'application/json'})
    return this._http.post(this.apiUrl,JSON.stringify(empleado), {headers: headers})
  }

  editEmployee(empleado){
    let headers = new HttpHeaders({ 'content-type': 'application/json' })
    return this._http.put(this.apiUrl + '/' + empleado.id, JSON.stringify(empleado), {headers: headers})
  }

  deleteEmployees(id){
    let headers = new HttpHeaders({ 'content-type': 'application/json' })
    return this._http.delete(this.apiUrl + '/' + id, {headers: headers})
  }
}
