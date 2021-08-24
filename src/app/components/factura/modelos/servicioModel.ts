export class ServiciosModel{
  public idClientes : number;
  public idEmpleados : number;
  public fechaServicio : Date;
  public valor : number;
  public estado : string;
  public fechaVencimiento : Date;
  public fechaMantenimiento : Date;
  public abono : number;
  public detalleServicios : any;
}

export class DetalleServicioModel{

  public idServicios : number;
  public descripcion : string;
  public idTipoExtintor : string;
  public idPesoExtintor : number;
  public valor : number;
  public cantidad : number;
  public total : number;
  public key : number;

  init(_data?: any) {
    if (_data) {
        this.idServicios = _data["idServicios"];
        this.descripcion = _data["descripcion"];
        this.idTipoExtintor = _data["idTipoExtintor"];
        this.idPesoExtintor = _data["idPesoExtintor"];
        this.valor = _data["valor"];
        this.cantidad = _data["cantidad"];
        this.total = _data["total"];
        this.key = _data["key"];
    }
}

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["idServicios"] = this.idServicios;
    data["descripcion"] = this.descripcion;
    data["idTipoExtintor"] = this.idTipoExtintor;
    data["idPesoExtintor"] = this.idPesoExtintor;
    data["valor"] = this.valor;
    data["cantidad"] = this.cantidad;
    data["total"] = this.total;
    data["key"] = this.key;
    return data;
}

  clone(): DetalleServicioModel {
    const json = this.toJSON();
    let result = new DetalleServicioModel();
    result.init(json);
    return result;
  }

}
