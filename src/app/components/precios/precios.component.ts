import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PreciosService } from '../../services/precios.service';
import { MessageService, ConfirmationService, ConfirmEventType } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { PrecioDialogComponent } from './precio-dialog/precio-dialog.component';
import { PreciosModel } from './models/precio-models';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.css'],
  providers: [ HttpClient, MessageService, ConfirmationService, NgForm ]
})
export class PreciosComponent implements OnInit {

  public preciosModel = new PreciosModel();
  precios: PreciosModel[] = [];
  preciosList: PreciosModel[] = [];
  position: string;
  displayPosition: boolean;
  buscarDescripcion = '';
  @ViewChild('agregarDialog') ad:PrecioDialogComponent;
  constructor(private _precioService: PreciosService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.vistaPrecios();
  }

  vistaPrecios(){
    this._precioService.verPrecio().subscribe(data => {
      let resp;
      resp = data;
      this.precios = resp?.data;
    })
  }

  addItem($event){
    this.vistaPrecios();
  }

  buscarPrecio(){
this._precioService.busquedaPrecio(this.buscarDescripcion).subscribe(data => {
  let result;
  result = data;
  this.precios = result?.data;
})
  }

  eliminarPrecios(preciosData){
    this.confirmationService.confirm({
      message: 'Esta seguro que decea eliminar este dato?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._precioService.eliminarPrecio(preciosData.id).subscribe(
        (data) => {
          this.preciosList = this.preciosList.filter((item) => {
            return item.id !== preciosData.id
          })
          this.vistaPrecios();
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

  showPositionDialog(precios){
    this.ad.showPositionDialog(precios);
  }

}
