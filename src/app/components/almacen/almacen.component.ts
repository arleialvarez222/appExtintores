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
    this._inventarioService.verinventario().subscribe(data => {
      let resp;
      resp = data;
      this.inventario = resp?.data;
    })
  }

  AddItem($event){
    this.mostrarInventario();
  }

  showPositionDialog(inventario){
    this.ad.showPositionDialog(inventario);
  }
}
