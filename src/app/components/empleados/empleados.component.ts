import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmpleadoService } from '../../services/empleado.service';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';
import { AgregarDialogComponent } from './agregar-dialog/agregar-dialog.component';
import { EmployeeModels } from './models/model-empleado';
import { EmpleadoInterface } from './models/interface-empleado';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css'],
  providers: [ HttpClient, NgForm, MessageService  ]
})
export class EmpleadosComponent implements OnInit {
  public employee = new EmployeeModels(0,'', '','','',0,'');
  empleado: EmpleadoInterface[] =[];
  employeesList: EmployeeModels[] = [];
  position: string;
  displayPosition: boolean;
  buscarNombre = '';
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
  addItem(form: any){
    this.allEmpleado();
  }

  deleteEmployee(employeeData: EmployeeModels){
    Swal.fire({
      title: '¿Seguro que quieres eliminar este dato?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._empleadoService.deleteEmployees(employeeData.id).subscribe(
          (data) => {
            this.allEmpleado();
            this.employeesList = this.employeesList.filter((item) => {
              return item.id !== employeeData.id;
            })
          }, (error) => {
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Fallo intentando eliminar'});
          })
        Swal.fire(
          'Exelente!',
          'Dato eliminado',
          'success'
        )
      }
    })
  }
//padre a hijo
  showPositionDialog(empleado){
    this.ad.showPositionDialog(empleado);
  }

}
