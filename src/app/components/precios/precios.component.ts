import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PreciosService } from '../../services/precios.service';
import { MessageService, ConfirmationService } from 'primeng/api';
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
  preciosDataItem;
  @ViewChild('agregarDialog') ad:PrecioDialogComponent;

  constructor(private _precioService: PreciosService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.vistaPrecios();
  }

  vistaPrecios(){
    this._precioService.verPrecio().subscribe(data => {
      let resp;
      resp = data;
      this.precios = resp?.data;
    }), (error) => {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'No se encontraron datos en la consulta', life: 1500});
    }
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

  onReject() {
    this.messageService.clear('g');
    this.messageService.add({severity:'warn', summary:'Cancelado', detail:'Se canceló la operación', life: 1500});
  }

  confirmarElimPrecio(precioId) {
    this.preciosDataItem = precioId;
    this.messageService.clear();
    this.messageService.add({key: 'g', sticky: true, severity:'warn', summary:'Estas seguro de esta acción?', detail:'Confirmas que deceas eliminar esta información?', closable: false, data: precioId, id: precioId});
  }

  eliminarPrecios(){
    this._precioService.eliminarPrecio(this?.preciosDataItem?.id).subscribe((data) => {
      this.preciosList = this.preciosList.filter((item) => {
        return item.id !== this?.preciosDataItem?.id
      })
      this.vistaPrecios();
      this.messageService.add({severity:'success', summary:'Exelente', detail:'Operación realizada con éxito', life: 1500});
    }, (error) => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Error, los datos no se eliminaron', life: 1500});
    })
    this.messageService.clear();
  }

  showPositionDialog(precios){
    this.ad.showPositionDialog(precios);
  }

}
