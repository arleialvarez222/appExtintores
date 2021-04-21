import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GastosService } from '../../services/gastos.service';
import { GastosModel } from './gastos.model';
import { MessageService } from 'primeng/api';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2'
import * as moment from 'moment';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css'],
  providers: [HttpClient, MessageService, NgForm],
})

export class GastosComponent implements OnInit {
  formEdit:NgForm
  form: NgForm

  public gastosModel = new GastosModel(0,'', '', 0, 0);
  public gastosEdit = new GastosModel(0,'', '', 0, 0);
  gastos = [];
  gastosDelet: any[] = []
  position: string;
  displayPosition: boolean = false;
  positionEdit: string;
  editGasto: boolean;

  constructor(
    private _gastosServices: GastosService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.getGastos();
  }

  getGastos() {
    this._gastosServices.getAllGastos().subscribe((data) => {
       let resp
        resp = data
        this.gastos = resp?.data;
      }, (error) => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'No se encontraron datos'});
      });
  }

  postGastos(form: NgForm) {
    if(form.invalid){
      this.messageService.add({severity:'warn', summary: 'Error', detail: 'Todos los campos son obligatorios'})
    }else{
      this._gastosServices.addGastos(this.gastosModel).subscribe(
        (data) => {
          this.getGastos()
          this.messageService.add({severity:'success', summary: 'OK', detail: 'Operación realizada con éxito'});
          form.resetForm()
        }, (error) => {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Fallo en la operación'});
        });
    }
  }
  editGastoDb(eventGasto, positionEdit: string){
    this.position = positionEdit
    this.editGasto = true
    this.gastosEdit = eventGasto
  }
  saveEditGasto(formEdit: NgForm){
    if(formEdit.invalid){
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Todos los campos son obligatorios'});
    }else{
      this._gastosServices.putGastos(this.gastosEdit).subscribe(
        (data) => {
          this.getGastos()
          this.messageService.add({severity:'success', summary: 'OK', detail: 'Actulización éxitosa'});
          this.editGasto = false;
        }, (error) => {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Fallo en la actualización'});
        });
    }
  }

  deletGastoDb(gastosData: any){
    Swal.fire({
      title: '¿Seguro que quieres eliminar este dato?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._gastosServices.deleteGastos(gastosData.id).subscribe(
          (data) => {
            this.getGastos()
            this.gastosDelet = this.gastosDelet.filter((item) => {
              return item.id !== gastosData.id
            })
          }, (error) => {
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Fallo intentando eliminar'})
          })
        Swal.fire(
          'Exelente!',
          'Dato eliminado',
          'success'
        )
      }
    })
  }

  showModal(){
    Swal.fire({
      title: '¿Seguro que quieres eliminar este dato?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }
  //dialogos
  cerrarDialog(form:NgForm) {
    this.displayPosition = false;
    this.gastosModel.descripcion = ''
    this.gastosModel.fecha = 'yyyy-MM-dd'
    this.gastosModel.cantidad = 0
    this.gastosModel.total = 0
    form.resetForm()
  }

  showPositionDialog(position: string) {
    this.position = position;
    this.displayPosition = true;
  }
  cerrarDialogEdit() {
    this.editGasto = false;
  }
}
