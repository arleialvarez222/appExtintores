import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmpleadoService } from '../../services/empleado.service';
import { NgForm } from '@angular/forms';
import { MessageService, ConfirmationService, ConfirmEventType } from 'primeng/api';
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
  @ViewChild('agregarDialog') ad: AgregarDialogComponent;

  constructor(private _empleadoService: EmpleadoService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) { }

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

  deleteEmployee(empleadoData){
    this.confirmationService.confirm({
      message: 'Esta seguro que decea eliminar este dato?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._empleadoService.deleteEmployees(empleadoData.id).subscribe(
        (data) => {
          this.employeesList = this.employeesList.filter((item) => {
            return item.id !== empleadoData.id
          })
          this.buscarEmpleado();
          this.messageService.add({severity:'success', summary:'Exelente', detail:'Operación realizada con éxito'});
        }, (error) => {
          this.messageService.add({severity:'error', summary:'Error', detail:'Operación fallida'});
        })
      },
      reject: (type) => {
          switch(type) {
              case ConfirmEventType.REJECT:
                  this.messageService.add({severity:'error', summary:'Cancelado', detail:'Se canceló la operación'});
              break;
              case ConfirmEventType.CANCEL:
                  this.messageService.add({severity:'warn', summary:'Cancelado', detail:'Operación cancelada'});
              break;
          }
      }
    });
  }

//padre a hijo
  showPositionDialog(empleado){
    this.ad.showPositionDialog(empleado);
  }

}
