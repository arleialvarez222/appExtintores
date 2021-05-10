import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GastosService } from '../../services/gastos.service';
import { GastosModel } from './models/gastos.model';
import { MessageService, ConfirmationService, ConfirmEventType } from 'primeng/api';
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
  @ViewChild('verDialogGasto') ad: DialogGastoComponent

  constructor(
              private _gastosServices: GastosService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) {}

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

  deletGastoDb(gastoData){
    this.confirmationService.confirm({
      message: 'Esta seguro que decea eliminar este dato?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._gastosServices.deleteGastos(gastoData.id).subscribe(
        (data) => {
          this.gastosDelet = this.gastosDelet.filter((item) => {
            return item.id !== gastoData.id
          })
          this.getGastos();
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

  showPositionDialog(gastos) {
   this.ad.showPositionDialog(gastos)
  }

}
