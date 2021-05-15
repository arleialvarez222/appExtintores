import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { InventarioModel } from '../modelos/invantarioModel';
import { NgForm } from '@angular/forms';
import { ProductoService } from '../../../services/producto.service';
import { ProductosModel } from '../../productos/modelos/productoModel';
import { TipoModel, PesoModel } from '../../extintor/models/tipo-interface';
import { ExtintorService } from '../../../services/extintor.service';

@Component({
  selector: 'app-almacen-dialog',
  templateUrl: './almacen-dialog.component.html',
  styleUrls: ['./almacen-dialog.component.css'],
  providers:[ NgForm ]
})
export class AlmacenDialogComponent implements OnInit {
  @Output() verInventarioComponent = new EventEmitter<InventarioModel>();
  public inventariado = new InventarioModel();
  producto: ProductosModel[] = [];
  tipoExt: TipoModel[] = [];
  peso: PesoModel[] = [];
  position: string;
  displayPosition:boolean = false;
  constructor(private _productoService: ProductoService,
              private _tipoExtintor: ExtintorService) { }

  ngOnInit(): void {
    this.verProducto();
    this.verTipoExt();
  }

  verProducto(){
    this._productoService.consultarProducto().subscribe(data => {
      let respuesta;
      respuesta = data;
      this.producto = respuesta?.data;
    })
  }

   verTipoExt(){
    this._tipoExtintor.mostrarTipo().subscribe(item => {
      let res;
      res = item;
      this.tipoExt = res?.item;
    })
  }

  showPositionDialog(inventario){
    let position : string;
    this.position = position;
    this.displayPosition = true;
    if(inventario){
      this.inventariado = {...inventario};
    }
  }

}
