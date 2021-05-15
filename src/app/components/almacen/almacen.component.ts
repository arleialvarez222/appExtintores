import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService, ConfirmationService, ConfirmEventType } from 'primeng/api';
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
  public inventariado = new InventarioModel();
  inventario: InventarioModel[] = [];
  inventarioDelet: InventarioModel[] = [];
  busquedaInventario = '';
  position: string;
  displayPosition: boolean = false;
  @ViewChild('componentInventario') ad: AlmacenDialogComponent;
  constructor(private _inventarioService: InventarioService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.mostrarInventario();
  }

  mostrarInventario(){
    this._inventarioService.verInventario().subscribe(data => {
      let resp;
      resp = data;
      this.inventario = resp?.data;
    })
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

  eliminarInventarios(eliminarData){
    this.confirmationService.confirm({
      message: 'Esta seguro que decea eliminar este dato?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._inventarioService.eliminarInventario(eliminarData.id).subscribe(
        (data) => {
          this.inventarioDelet = this.inventarioDelet.filter((item) => {
            return item.id !== eliminarData.id
          })
          this.mostrarInventario();
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

  showPositionDialog(inventario){
    this.ad.showPositionDialog(inventario);
  }
}
