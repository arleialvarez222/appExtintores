import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductosModel } from '../modelos/productoModel';
import { NgForm } from '@angular/forms';
import { PesoModel, TipoModel } from '../../extintor/models/tipo-interface';
import { ProductoService } from '../../../services/producto.service';
import { ExtintorService } from '../../../services/extintor.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-productos-dialog',
  templateUrl: './productos-dialog.component.html',
  styleUrls: ['./productos-dialog.component.css'],
  providers: [MessageService]
})
export class ProductosDialogComponent implements OnInit {
  @Output() verProducto = new EventEmitter<ProductosModel>();
  public tipoModel = new TipoModel();
  public productoss = new ProductosModel();
  pesoE: PesoModel[] = [];
  tipo: TipoModel[] = [];
  position: string;
  displayPosition: boolean = false;

  constructor(private _productoService: ProductoService,
              private _extintorService: ExtintorService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.verPeso();
    this.verTipo();
  }

  verPeso(){
    this._extintorService.mostrarPeso().subscribe(data => {
      let respuesta;
      respuesta = data;
      this.pesoE = respuesta?.data;
    })
  }

  verTipo(){
    this._extintorService.mostrarTipo().subscribe(data => {
      let resp;
      resp = data;
      this.tipo = resp?.data;
    })
  }

  guardarProducto(formulario: NgForm){
    if(formulario.invalid){
      Object.values(formulario.controls).forEach(control => {
        control.markAsTouched();
      })
    }else{
      if(this.productoss?.id > 0){
        this._productoService.editarProducto(this.productoss).subscribe(data => {
          this.messageService.add({severity:'success', summary: 'OK', detail: 'Actualización éxitosa'});
          this.verProducto.emit(this.productoss);
          formulario.resetForm();
          this.displayPosition = false;
        }, (error) => {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Fallo al actualizar datos'});
        }
        )
      }else{
        this._productoService.guardarProducto(this.productoss).subscribe(data => {
          this.messageService.add({severity:'success', summary: 'OK', detail: 'Operación realizada con éxito'});
          this.verProducto.emit(this.productoss);
          formulario.resetForm();
        }, (error) => {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Fallo!!!, revisar que los campos esten completos'});
        }
        )
      }
    }
  }

  showPositionDialog(producto){
    let position: string;
    position = position;
    this.displayPosition = true;
    if(producto){
      this.productoss = {...producto};
    }
  }

  cerrarDialog(formulario: NgForm){
    this.displayPosition = false;
    formulario.resetForm();
  }
}
