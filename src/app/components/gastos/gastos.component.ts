import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GastosService } from '../../services/gastos.service';
import { GastosModel } from './gastos.model';
import { MessageService } from 'primeng/api';
import * as moment from 'moment';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css'],
  providers: [HttpClient, MessageService],
})

export class GastosComponent implements OnInit {



  public gastosModel = new GastosModel(0,'', 'dd-MM-yyyy', 0, 0);
  public gastosEdit = new GastosModel(0,'', 'dd-MM-yyyy', 0, 0);
  gastos = [];
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
      },
      (error) => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'No se encontraron datos'});

      }
    );
  }

  postGastos() {
    this._gastosServices.addGastos(this.gastosModel).subscribe(
      (data) => {
        this.getGastos()
        this.messageService.add({severity:'success', summary: 'OK', detail: 'Operación realizada con éxito'});

      },
      (error) => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Fallo en la operación'});
      });

  }
  editGastoDb(eventGasto, positionEdit: string){
    this.position = positionEdit
    this.editGasto = true
    this.gastosEdit = eventGasto
  }
  saveEditGasto(){
    this._gastosServices.putGastos(this.gastosEdit).subscribe(
      (data) => {
        this.getGastos()
        this.messageService.add({severity:'success', summary: 'OK', detail: 'Actulización éxitosa'});

      },
      (error) => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Fallo en la actualización'});
      });
  }

  deletGastoDb(gastosData){
    this._gastosServices.deleteGastos(gastosData.id).subscribe(
      (data) => {
        this.getGastos()
        this.messageService.add({severity:'success', summary: 'OK', detail: 'Dato eliminado'});

      },
      (error) => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Fallo intentando eliminar'});
      });
  }






  //dialogos
  cerrarDialog() {
    this.displayPosition = false;
    this.gastosModel.descripcion = ''
    this.gastosModel.fecha = 'yyyy-MM-dd'
    this.gastosModel.cantidad = 0
    this.gastosModel.total = 0

  }

  showPositionDialog(position: string) {
    this.position = position;
    this.displayPosition = true;
  }
  cerrarDialogEdit() {
    this.editGasto = false;
  }
}
