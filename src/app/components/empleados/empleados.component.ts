import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmpleadoService } from '../../services/empleado.service';
import { NgForm } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { AgregarDialogComponent } from './agregar-dialog/agregar-dialog.component';
import { EmployeeModel } from './models/model-empleado';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css'],
  providers: [ HttpClient, NgForm, MessageService, ConfirmationService  ]
})
export class EmpleadosComponent implements OnInit {
  public employee = new EmployeeModel();
  empleado: EmployeeModel[] =[];
  employeesList: EmployeeModel[] = [];
  position: string;
  displayPosition: boolean;
  buscarNombre = '';
  empleadoDataItem;
  @ViewChild('agregarDialog') ad: AgregarDialogComponent;

  constructor(private _empleadoService: EmpleadoService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.allEmpleado();
  }

  allEmpleado(){
    this._empleadoService.getAllEmpleado().subscribe(data =>{
      let resp;
      resp = data;
      this.empleado = resp?.data;
    },(error) => {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Fallo al cargar los datos'});
    })
  }

  buscarEmpleado(){
    this._empleadoService.buscarEmpleado(this.buscarNombre).subscribe(data =>{
      let resp;
      resp = data;
      this.empleado = resp?.data;
    },(error) => {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Fallo al cargar los datos'});
    })
  }

  //hijo a padre
  addItem($event){
    this.allEmpleado();
  }

  onReject() {
    this.messageService.clear('h');
    this.messageService.add({severity:'warn', summary:'Cancelado', detail:'Se canceló la operación', life: 1500});
  }

  confirmarElimEmpleado(empleadoId) {
    this.empleadoDataItem = empleadoId;
    this.messageService.clear();
    this.messageService.add({key: 'h', sticky: true, severity:'warn', summary:'Estas seguro de esta acción?', detail:'Confirmas que deceas eliminar esta información?', closable: false, data: empleadoId, id: empleadoId});
  }

  deleteEmployee(){
    this._empleadoService.deleteEmployees(this?.empleadoDataItem?.idEmpleados).subscribe((data) => {
      this.employeesList = this.employeesList.filter((item) => {
        return item?.idEmpleados !== this?.empleadoDataItem?.idEmpleados
      })
      this.buscarEmpleado();
      this.messageService.add({severity:'success', summary:'Exelente', detail:'Operación realizada con éxito', life: 1500});
    }, (error) => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Error, los datos no se eliminaron', life: 1500});
    })
    this.messageService.clear();
  }

//padre a hijo
  showPositionDialog(empleado){
    this.ad.showPositionDialog(empleado);
  }

}
