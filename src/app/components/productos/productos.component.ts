import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService, ConfirmationService, ConfirmEventType } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { ProductosModel } from './modelos/productoModel';
import { ProductoService } from '../../services/producto.service';
import { ProductosDialogComponent } from './productos-dialog/productos-dialog.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  providers: [MessageService, ConfirmationService, NgForm]
})
export class ProductosComponent implements OnInit {
  public productoss = new ProductosModel();

  producto: ProductosModel[] = [];
  productoDelet: ProductosModel[] = [];
  busquedaProducto = '';
  @ViewChild('productodialogo') ad: ProductosDialogComponent
  constructor(private _productosService: ProductoService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.verProductos();
  }

  verProductos(){
    this._productosService.consultarProducto().subscribe(data => {
      let result;
      result = data;
      this.producto = result?.data;
    })
  }

  addItem($event){
    this.verProductos();
  }


  buscarProducto(){
    this._productosService.busquedaProducto(this.busquedaProducto).subscribe(data => {
      let arrayRes;
      arrayRes = data;
      this.producto = arrayRes?.data;
    })
  }

  eliminarProducto(productoData){
    this.confirmationService.confirm({
      message: 'Esta seguro que decea eliminar este dato?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._productosService.eliminarProducto(productoData.id).subscribe(
        (data) => {
          this.productoDelet = this.productoDelet.filter((item) => {
            return item.id !== productoData.id
          })
          this.verProductos();
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

  showPositionDialog(producto){
    this.ad.showPositionDialog(producto);
  }
}
