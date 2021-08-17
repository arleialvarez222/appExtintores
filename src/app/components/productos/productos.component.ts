import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
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
  productoDataItem;
  @ViewChild('productodialogo') ad: ProductosDialogComponent
  constructor(private _productosService: ProductoService,
              private messageService: MessageService,) { }

  ngOnInit(): void {
    this.verProductos();
  }

  verProductos(){
    this._productosService.consultarProducto().subscribe(data => {
      let result;
      result = data;
      this.producto = result?.data;
      console.log(result)
    }),(error)=> {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'No se encontraron datos para mostrar'});
    }
  }

  addItem($event){
    this.verProductos();
  }

  buscarProducto(){
    this._productosService.busquedaProducto(this?.busquedaProducto).subscribe(data => {
      let arrayRes;
      arrayRes = data;
      this.producto = arrayRes?.data;
    })
  }

  onReject() {
    this.messageService.clear('c');
    this.messageService.add({severity:'warn', summary:'Cancelado', detail:'Se canceló la operación', life: 1500});
  }

  confirmarElimProducto(productoId) {
    this.productoDataItem = productoId;
    this.messageService.clear();
    this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'Estas seguro de esta acción?', detail:'Confirmas que deceas eliminar esta información?', closable: false, data: productoId, id: productoId});

  }

  eliminarProducto(){
    this._productosService.eliminarProducto(this?.productoDataItem?.idProductos).subscribe((data) => {
      this.productoDelet = this.productoDelet?.filter((item) => {
        return item?.idProductos !== this.productoDataItem?.idProductos
      })
      this.verProductos();
      this.messageService.add({severity:'success', summary:'Exelente', detail:'Operación realizada con éxito', life:1500 });
        }, (error) => {
          this.messageService.add({severity:'error', summary:'Error', detail:'Operación fallida, los datos no se eliminaron', life: 1500});
        })
       this.messageService.clear('c');
  }

  showPositionDialog(producto){
    this.ad.showPositionDialog(producto);
  }
}
