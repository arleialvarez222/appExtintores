export class GastosModel {

  static gastoJson(obj:object){
    return new GastosModel(
      obj ['id'],
      obj ['descripcion'],
      obj ['fecha'],
      obj ['cantidad'],
      obj ['total']
    )
  }

  constructor(
    public id: number,
    public descripcion: string,
    public fecha: string,
    public cantidad: number,
    public total: number,
  ){

  }
}
