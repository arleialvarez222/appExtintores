import { EmpleadoInterface } from './interface-empleado';
export class EmployeeModels {

  static empleadoJson(obj:object){
    return new EmployeeModels(
      obj ['id'],
      obj ['idEmpresa'],
      obj ['nombre'],
      obj ['apellido'],
      obj ['direccion'],
      obj ['telefono'],
      obj ['email']
    )
  }

  constructor(
    public id: number,
    public idEmpresa: string,
    public nombre: string,
    public apellido: string,
    public direccion: string,
    public telefono: number,
    public email: string
  ){

  }
}
