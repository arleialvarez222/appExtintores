import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService, ConfirmationService } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { InventarioModel } from './modelos/invantarioModel';
import { InventarioService } from '../../services/inventario.service';
import { AlmacenDialogComponent } from './almacen-dialog/almacen-dialog.component';

@Component({
  selector: 'app-almacen',
  templateUrl: './almacen.component.html',
  styleUrls: ['./almacen.component.css'],
  providers: [ HttpClient, MessageService, ConfirmationService, NgForm ]
})
export class AlmacenComponent implements OnInit {

  inventario: InventarioModel[] = [];
  inventarioDelet: InventarioModel[] = [];
  busquedaInventario = '';
  position: string;
  displayPosition: boolean = false;
  inventarioDataItem;
  @ViewChild('componentInventario') ad: AlmacenDialogComponent;
  public inventariado = new InventarioModel();


  constructor(private _inventarioService: InventarioService,
              private messageService: MessageService,) { }

  ngOnInit(): void {
    this.mostrarInventario();
  }

  mostrarInventario(){
    this._inventarioService?.verInventario().subscribe(data => {
      let resp;
      resp = data;
      this.inventario = resp?.data;
      console.log(resp?.data);
    }), (error) => {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'No se encontraron datos en la consulta', life: 1500});
    }
  }

  buscarInventario(){
    this._inventarioService.busacandoInventario(this.busquedaInventario).subscribe(data => {
      let respuesta;
      respuesta = data;
      this.inventario = respuesta?.data;
    })
  }

  AddItem($event){
    this.mostrarInventario();
  }

  onReject() {
    this.messageService.clear('e');
    this.messageService.add({severity:'warn', summary:'Cancelado', detail:'Se canceló la operación', life: 1500});
  }

  confirmarElimInventario(inventarioId) {
    this.inventarioDataItem = inventarioId;
    this.messageService.clear();
    this.messageService.add({key: 'e', sticky: true, severity:'warn', summary:'Estas seguro de esta acción?', detail:'Confirmas que deceas eliminar esta información?', closable: false, data: inventarioId, id: inventarioId});
  }

  eliminarInventarios(){
    this._inventarioService.eliminarInventario(this?.inventarioDataItem?.idInventario).subscribe((data) => {
      this.inventarioDelet = this.inventarioDelet?.filter((item) => {
        return item?.idInventario !== this?.inventarioDataItem?.idInventario
      })
      this.mostrarInventario();
      this.messageService.add({severity:'success', summary:'Exelente', detail:'Operación realizada con éxito', life: 1500});
    }, (error) => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Operación fallida, los datos no se eliminaron', life: 1500});
    })
    this.messageService.clear();
  }

  showPositionDialog(inventario){
    this.ad.showPositionDialog(inventario);
  }
}
