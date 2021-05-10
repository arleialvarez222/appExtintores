import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EmployeeModel } from '../components/empleados/models/model-empleado';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private apiEndpoint = `${environment.apiUrl}/api`;

  constructor(private _http: HttpClient) {}

  buscarEmpleado(nombre=null, apellido=null){
    let headers = new HttpHeaders({'content-type': 'application/json'})
    let baseUrl= `${this.apiEndpoint}/Empleados?`;
    if(nombre!==null){
      baseUrl +=`Nombres=${nombre}&`
    }
    if(apellido!==null){
      baseUrl +=`Apellidos=${apellido}&`
    }
    return this._http.get<EmployeeModel>(baseUrl, {headers: headers})
  }

  getAllEmpleado(){
    let headers = new HttpHeaders({'content-type': 'application/json'})
    return this._http.get<EmployeeModel>(`${this.apiEndpoint}/Empleados`, {headers: headers})
  }

  addEmployee$(empleado: EmployeeModel){
    let headers = new HttpHeaders({'content-type': 'application/json'})
    return this._http.post<EmployeeModel>(`${this.apiEndpoint}/Empleados`, JSON.stringify(empleado), {headers: headers})
  }

  editEmployee(empleado: EmployeeModel){
    let headers = new HttpHeaders({ 'content-type': 'application/json' })
    return this._http.put<EmployeeModel>(`${this.apiEndpoint}/Empleados/${empleado.id}`, JSON.stringify(empleado), {headers: headers})
  }

  deleteEmployees(id){
    let headers = new HttpHeaders({ 'content-type': 'application/json' })
    return this._http.delete<EmployeeModel>(`${this.apiEndpoint}/Empleados/${id}`, {headers: headers})
  }
}
