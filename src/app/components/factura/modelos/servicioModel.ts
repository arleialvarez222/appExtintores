export class ServiciosModel{
  public id : number;
  public idClientes : number;
  public idEmpleados : number;
  public fechaServicio : Date;
  public valor : number;
  public estado : string;
}

export class DetalleServicioModel{
  public id : number;
  public idServicios : number;
  public descripcion : string;
  public tipoExtintor : string;
  public pesoXlibras : number;
  public valor : number;
  public cantidad : number;
  public total : number;
}
