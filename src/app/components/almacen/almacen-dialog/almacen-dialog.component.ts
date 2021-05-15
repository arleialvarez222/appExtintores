import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { InventarioModel } from '../modelos/invantarioModel';
import { NgForm } from '@angular/forms';
import { ProductoService } from '../../../services/producto.service';
import { ProductosModel } from '../../productos/modelos/productoModel';
import { TipoModel, PesoModel } from '../../extintor/models/tipo-interface';
import { ExtintorService } from '../../../services/extintor.service';
import { InventarioService } from '../../../services/inventario.service';
import { MessageService } from 'primeng/api';
import * as moment from 'moment';

@Component({
  selector: 'app-almacen-dialog',
  templateUrl: './almacen-dialog.component.html',
  styleUrls: ['./almacen-dialog.component.css'],
  providers:[ NgForm, MessageService ]
})
export class AlmacenDialogComponent implements OnInit {
  @Output() verInventarioComponent = new EventEmitter<InventarioModel>();
  public inventariado = new InventarioModel();
  producto: ProductosModel[] = [];
  tipoExt: TipoModel[] = [];
  pesoExt: PesoModel[] = [];
  position: string;
  displayPosition:boolean = false;
  constructor(private _inventarioService: InventarioService,
              private _productoService: ProductoService,
              private _tipoExtintor: ExtintorService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.verProducto();
    this.verTipoExt();
    this.verPesoExt();
  }

  verProducto(){
    this._productoService.consultarProducto().subscribe(data => {
      let respuesta;
      respuesta = data;
      this.producto = respuesta?.data;
    })
  }

  verTipoExt(){
    this._tipoExtintor.mostrarTipo().subscribe(data => {
      let res;
      res = data;
      this.tipoExt = res?.data;
    })
  }

  verPesoExt(){
    this._tipoExtintor.mostrarPeso().subscribe(data => {
      let resp;
      resp = data;
      this.pesoExt = resp?.data;
    })
  }

  alamcenarInventario(form: NgForm){
    if(form.invalid){
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      })
    }else{
      if(this.inventariado?.id > 0){
        this.inventariado.fecha  = moment(
          this.inventariado.fecha).toDate();
        this.inventariado.fechaVencimiento = moment(
          this.inventariado.fechaVencimiento).toDate();
        this._inventarioService.editarInventario(this.inventariado).subscribe(data => {
          this.messageService.add({severity:'success', summary: 'OK', detail: 'Actualización éxitosa'});
          this.verInventarioComponent.emit(this.inventariado);
          form.resetForm();
          this.displayPosition = false;
        }, (error) => {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Fallo al actualizar datos'});
        })
      }else{
        this.inventariado.fecha  = moment(
          this.inventariado.fecha).toDate();
        this.inventariado.fechaVencimiento = moment(
          this.inventariado.fechaVencimiento).toDate();
        this._inventarioService.guardarInventario(this.inventariado).subscribe(data => {
          this.messageService.add({severity:'success', summary: 'OK', detail: 'Operación realizada con éxito'});
          this.verInventarioComponent.emit(this.inventariado);
          form.resetForm();
        }, (error) => {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Fallo!!!, revisar que los campos esten completos'});
        })
      }
    }
  }

  showPositionDialog(inventario){
    let position : string;
    this.position = position;
    this.displayPosition = true;
    if(inventario){
      this.inventariado = {...inventario};
    }
  }

  cerrarDialog(form: NgForm){
    this.displayPosition = false;
    form.resetForm();
  }

}
