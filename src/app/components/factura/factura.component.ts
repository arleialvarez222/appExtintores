import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api'
import { ClientesService } from 'src/app/services/clientes.service';
import { NgForm } from '@angular/forms';
import { ClienteModel } from '../clientes/models/clienteModel';
import { EmployeeModel } from '../empleados/models/model-empleado';
import { EmpleadoService } from '../../services/empleado.service';
import { ServiciosModel, DetalleServicioModel } from './modelos/servicioModel';
import { PesoModel, TipoModel } from '../extintor/models/tipo-interface';
import { ExtintorService } from '../../services/extintor.service';
import * as shortid from 'shortid';
import { ServiciosService } from 'src/app/services/servicios.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css'],
  providers: [HttpClient, MessageService, ConfirmationService, NgForm]
})
export class FacturaComponent implements OnInit {
  public servicioModel = new ServiciosModel();
  public detalleServicio = new DetalleServicioModel();
  public detalleEdicionServicio = new DetalleServicioModel();

  clientes: ClienteModel[]= [];
  empleados: EmployeeModel[]= [];
  pesoExti: PesoModel[] = [];
  tipoExti: TipoModel[] = [];
  detalleFactura: DetalleServicioModel[] = [];
  totalN: number;
  iva: number;

  constructor
    (
      private _clienteService: ClientesService,
      private _empleadoService: EmpleadoService,
      private _extintorService: ExtintorService,
      private messageService: MessageService,
      private _serviciosService:ServiciosService,
    ) { }

  ngOnInit(): void {
    this.clienteConsulta();
    this.empleadoConsulta();
    this.pesoConsulta();
    this.tipoConsulta();
  }

  clienteConsulta(){
    this._clienteService.consultarCliente().subscribe(data => {
      let respuesta;
      respuesta = data;
      this.clientes = respuesta?.data;
    }, (error) => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Operación fallida'});
    })
  }

  empleadoConsulta(){
    this._empleadoService.getAllEmpleado().subscribe(data => {
      let resp;
      resp = data;
      this.empleados = resp?.data;
    }, (error) => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Operación fallida'});
    })
  }

  pesoConsulta(){
    this._extintorService.mostrarPeso().subscribe(data => {
      let resp;
      resp = data;
      this.pesoExti = resp?.data;
    }, (error) => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Operación fallida'});
    })
  }

  tipoConsulta(){
    this._extintorService.mostrarTipo().subscribe(data => {
      let result;
      result = data;
      this.tipoExti = result?.data;
    }, (error) => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Operación fallida'});
    })
  }

  agregarDetalle(form:NgForm){
     if(this?.detalleServicio?.key != null){
      this.modalEditarDetalle(this.detalleServicio);
      form.resetForm();
      this.detalleServicio.key = null;
    }else{

      this.detalleServicio.total = this?.detalleServicio?.cantidad * this?.detalleServicio?.valor;
      this.detalleFactura.push(this?.detalleServicio?.clone());
      let respuesta = [...this.detalleFactura];
      for (let i = 0; i < respuesta.length; i++) {
        respuesta[i]['key'] = shortid?.generate();
      }
      this.operacionesDetalle();
      //form.resetForm();
     }
  }


  operacionesDetalle(){
    this.detalleServicio.total = 0;
    this.detalleFactura?.forEach((x) => {
      this.detalleServicio.total += x?.cantidad * x?.valor;
      this.iva = this?.detalleServicio?.total * 0.19;
      this.totalN = this?.detalleServicio?.total - this?.iva;
    })
  }

  guardarServicio(form: NgForm){
    if(form.invalid){
      Object.values(form.controls).forEach(control => {
        control.markAsTouched()
      });
    }else{
      this.servicioModel.detalleServicios = this?.detalleFactura;
      this.servicioModel.valor = this?.detalleServicio?.total;
      this._serviciosService.agregarServicio(this?.servicioModel).subscribe(data => {
        this.messageService.add({severity:'success', summary: 'OK', detail: 'Los datos se guardaron correctamente', life: 1500});
        //console.log(data);
        form.resetForm();
        this.detalleFactura = [];
        this.detalleServicio.total = 0;
        this.iva = 0;
        this.totalN = 0;
      }), (error) => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Error en la operacion, los datos no se guardaron', life: 1500});
      }
    }
  }

  editarDetalle(item: DetalleServicioModel){
    this.detalleServicio = item.clone();
    this.modalEditarDetalle(this?.detalleServicio);
  }

  modalEditarDetalle(detalleServicio: DetalleServicioModel){
    let respuesta = detalleServicio;
    let itemData = this.detalleFactura;
    itemData.map(resp => {
      if(resp?.key === this.detalleServicio?.key){
        resp.descripcion = respuesta?.descripcion;
        resp.cantidad = respuesta?.cantidad;
        resp.idPesoExtintor = respuesta?.idPesoExtintor;
        resp.idTipoExtintor = respuesta?.idTipoExtintor;
        resp.total = respuesta?.total;
        resp.valor = respuesta?.valor;
      }
      this.operacionesDetalle();

      return respuesta;
    })
  }

  eliminarDetalle(item: DetalleServicioModel){
    this.detalleFactura = this?.detalleFactura?.filter(
      (c) => c?.key !== item?.key
    );
    this.operacionesDetalle();

    if(this.detalleFactura?.length == 0){
      this.detalleFactura = [];
      this.detalleServicio.total = 0;
      this.iva = 0;
      this.totalN = 0;
    }
  }

}
