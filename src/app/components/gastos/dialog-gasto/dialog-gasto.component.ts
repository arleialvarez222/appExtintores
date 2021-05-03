import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MessageService } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { GastosService } from '../../../services/gastos.service';
import { GastosModel } from '../models/gastos.model';
import { GastoInterface } from '../models/interface';

@Component({
  selector: 'app-dialog-gasto',
  templateUrl: './dialog-gasto.component.html',
  styleUrls: ['./dialog-gasto.component.css']
})
export class DialogGastoComponent implements OnInit {

  @Output() verEvento = new EventEmitter<GastosModel>()
  public gastosModel = new GastosModel(0, '', '', 0, 0 );
  position: string;
  displayPosition: boolean = false;

  constructor(private _gastosServices: GastosService,
              private messageService: MessageService) {}

  ngOnInit(): void {}

  postGastos(form: NgForm) {
    if(form.invalid){
       Object.values(form.controls).forEach(control => {
        control.markAsTouched()
      })
    }else{
      if(this.gastosModel?.id > 0){
        this._gastosServices.putGastos(this.gastosModel).subscribe(
          (data) => {
            this.messageService.add({severity:'success', summary: 'OK', detail: 'Operación realizada con éxito'});
            this.verEvento.emit(this.gastosModel)
            form.resetForm()
            this.displayPosition = false;
          }, (error) => {
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Fallo en la operación'});
          });
      }else{
        this._gastosServices.addGastos(this.gastosModel).subscribe(
          (data) => {
            this.messageService.add({severity:'success', summary: 'OK', detail: 'Operación realizada con éxito'});
            this.verEvento.emit(this.gastosModel)
            form.resetForm()
          }, (error) => {
            this.messageService.add({severity:'warn', summary: 'Error', detail: 'Todos los campos deben estar completos'});
          });
        }
      }
  }

  showPositionDialog(gastos: GastosModel){
    let form: NgForm
    let position: string
    this.position = position;
    this.displayPosition = true;
     if(gastos){
        this.gastosModel = JSON.parse(JSON.stringify(gastos));
    }
  }
  //dialogos
  cerrarDialog(forma: NgForm) {
    this.displayPosition = false;
    this.gastosModel.descripcion = ''
    this.gastosModel.fecha = ''
    this.gastosModel.cantidad = 0
    this.gastosModel.total = 0
    forma.resetForm()
  }
}
