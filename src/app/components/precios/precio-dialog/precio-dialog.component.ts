import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PreciosService } from 'src/app/services/precios.service';
import { PreciosModel } from '../models/precio-models';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-precio-dialog',
  templateUrl: './precio-dialog.component.html',
  styleUrls: ['./precio-dialog.component.css']
})
export class PrecioDialogComponent implements OnInit {
  @Output() verPrecio = new EventEmitter<PreciosModel>();
  public preciosModel = new PreciosModel();
  productos = [];
  displayPosition: boolean;
  position: string;


  constructor(private _precioService: PreciosService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.mostrarProducto();
  }

  mostrarProducto(){
    this._precioService.verProducto().subscribe(data => {
      let respuesta;
      respuesta = data;
      this.productos = respuesta?.data
    }, (error) => {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'No se encontraron datos'});
    })
  }

  agregarPrecio(form: NgForm){
    if(form.invalid){
        Object.values(form.controls).forEach(control => {
          control.markAsTouched()
        })
    }else{
      if(this.preciosModel.id > 0){
        this._precioService.editarPrecio(this.preciosModel).subscribe(data => {
          this.messageService.add({severity:'success', summary: 'OK', detail: 'Los datos se actualizaron correctamente', life: 1500});
          this.verPrecio.emit(this.preciosModel)
          form.resetForm();
          this.displayPosition = false;
        }, (error) => {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Error, fallas en la actualización', life: 1500});
        })
      }else{
        this._precioService.guardarPrecio(this.preciosModel).subscribe(data => {
          this.messageService.add({severity:'success', summary: 'OK', detail: 'Los datos se guardaron correctamente', life: 1500});
              this.verPrecio.emit(this.preciosModel);
              form.resetForm();
        }, (error) => {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Error en la operacion, los datos no se guardaron', life: 1500});
        })
      }
    }
  }

  showPositionDialog(precios){
    let position: string;
    this.position = position
    this.displayPosition = true
    if(precios){
      this.preciosModel = JSON.parse(JSON.stringify(precios))
    }
  }

  cerrarDialog(form: NgForm) {
    this.displayPosition = false;
    form.resetForm();
  }
}
