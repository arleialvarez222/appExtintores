import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GastosService } from '../../services/gastos.service';
import { GastosModel } from './models/gastos.model';
import { MessageService, ConfirmationService } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { DialogGastoComponent } from './dialog-gasto/dialog-gasto.component';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css'],
  providers: [HttpClient, MessageService, ConfirmationService, NgForm],
})

export class GastosComponent implements OnInit {

  public gastosModel = new GastosModel();
  gastos: GastosModel[] = [];
  gastosDelet: GastosModel[] = []
  position: string;
  displayPosition: boolean;
  buscarDescripcion = '';
  gastosDataItem;
  @ViewChild('verDialogGasto') ad: DialogGastoComponent

  constructor(
              private _gastosServices: GastosService,
              private messageService: MessageService,) {}

  ngOnInit(): void {
    this.getGastos();
  }

  getGastos() {
    this._gastosServices.getAllGastos().subscribe(data => {
      let respuesta;
      respuesta = data;
        this.gastos = respuesta?.data;
      }, (error) => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'No se encontraron datos'});
      });
  }

  addItem($event){
    this.getGastos();
  }

  buscarGasto(){
    this._gastosServices.getBuscar(this.buscarDescripcion).subscribe((data) => {
      let res;
      res = data;
      this.gastos = res?.data;
    }, (error) => {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'No se encontraron datos'});
    });
  }

  onReject() {
    this.messageService.clear('f');
    this.messageService.add({severity:'warn', summary:'Cancelado', detail:'Se canceló la operación', life: 1500});
  }

  confirmarElimGasto(gastosId) {
    this.gastosDataItem = gastosId;
    this.messageService.clear();
    this.messageService.add({key: 'f', sticky: true, severity:'warn', summary:'Estas seguro de esta acción?', detail:'Confirmas que deceas eliminar esta información?', closable: false, data: gastosId, id: gastosId});
  }

  deletGastoDb(){
    this._gastosServices.deleteGastos(this?.gastosDataItem?.idGastos).subscribe((data) => {
      this.gastosDelet = this.gastosDelet.filter((item) => {
        return item?.idGastos !== this?.gastosDataItem?.idGastos
      })
      this.getGastos();
      this.messageService.add({severity:'success', summary:'Exelente', detail:'Operación realizada con éxito', life: 1500});
    }, (error) => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Operación fallida, los datos no se eliminaron', life: 1500});
    })
    this.messageService.clear();
  }

  showPositionDialog(gastos) {
   this.ad.showPositionDialog(gastos)
  }

}
