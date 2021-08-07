import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService, ConfirmEventType } from 'primeng/api'
import { ClientesService } from 'src/app/services/clientes.service';
import { NgForm } from '@angular/forms';
import { ClienteModel } from '../clientes/models/clienteModel';
import { EmployeeModel } from '../empleados/models/model-empleado';
import { EmpleadoService } from '../../services/empleado.service';
import { ServiciosModel, DetalleServicioModel } from './modelos/servicioModel';
import { PesoModel, TipoModel } from '../extintor/models/tipo-interface';
import { ExtintorService } from '../../services/extintor.service';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css'],
  providers: [MessageService, ConfirmationService, NgForm]
})
export class FacturaComponent implements OnInit {
  public servicioModel = new ServiciosModel();
  public detalleServicio = new DetalleServicioModel();

  clientes: ClienteModel[]= [];
  empleados: EmployeeModel[]= [];
  pesoExti: PesoModel[] = [];
  tipoExti: TipoModel[] = [];
  detalleFactura: DetalleServicioModel[] = [];

  constructor(private _clienteService: ClientesService,
              private _empleadoService: EmpleadoService,
              private _extintorService: ExtintorService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) { }

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
    this.detalleFactura.push(this.detalleServicio);

}


}
