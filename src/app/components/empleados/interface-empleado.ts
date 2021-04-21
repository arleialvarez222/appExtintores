export class EmployeeInterface {
  constructor(
    public id: number,
    public idEmpresa: number,
    public nombre: string,
    public apellido: string,
    public direccion: string,
    public telefono: number,
    public email: string
  ){

  }
}
