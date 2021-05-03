import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { EmpleadoService } from '../../../services/empleado.service';
import { EmployeeModels } from '../models/model-empleado';
import { MessageService } from 'primeng/api';
import { EmpresaService } from '../../../services/empresa.service';
import { EmpleadoInterface } from '../models/interface-empleado';

@Component({
  selector: 'app-agregar-dialog',
  templateUrl: './agregar-dialog.component.html',
  styleUrls: ['./agregar-dialog.component.css'],
  providers:[ HttpClient,  MessageService ]
})
export class AgregarDialogComponent implements OnInit {

  @Output() newEmployeeEvent = new EventEmitter<EmployeeModels>()
  empresa: any = []
  public employee = new EmployeeModels(0,'', '','','',0,'')
  position:string
  displayPosition = false;
  constructor( private _empleadoService: EmpleadoService,
               private _empresaService: EmpresaService,
               private messageService: MessageService) {  }

  ngOnInit(): void {
    this.verEmpresa()
  }

  addPostEployee(forma: NgForm){
    if(forma.invalid){
      Object.values(forma.controls).forEach(control => {
        control.markAsTouched()
      })
    }else{
      if(this.employee?.id > 0){
        this._empleadoService.editEmployee(this.employee).subscribe( data => {
          this.messageService.add({severity:'success', summary: 'OK', detail: 'Se actualizó con éxito'});
          this.newEmployeeEvent.emit(this.employee)
          forma.resetForm()
         this.displayPosition = false
        }, (error) =>{
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Fallo al actualizar datos'});
        })
      }else{
        this._empleadoService.addEmployee$(this.employee).subscribe( data => {
          this.messageService.add({severity:'success', summary: 'OK', detail: 'Operación realizada con éxito'});
          this.newEmployeeEvent.emit(this.employee)
          forma.resetForm()
        }, (error) =>{
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Verificar que los campos esten completos'});
        })
      }
    }
    }
  verEmpresa(){
    this._empresaService.consultarEmpresa().subscribe(data => {
      let resp;
      resp = data;
      this.empresa = resp?.data;
    })
  }

  showPositionDialog(empleado: EmpleadoInterface) {
    let position: string
    this.position = position;
    this.displayPosition = true;
    if(empleado){
      this.employee = JSON.parse(JSON.stringify(empleado));
    }
  }

  cerrarDialog(forma: NgForm) {
    this.displayPosition = false;
    this.employee.nombre = ''
    this.employee.apellido = ''
    this.employee.telefono = 0
    this.employee.direccion = ''
    this.employee.email = ''
    forma.resetForm()
  }
}
