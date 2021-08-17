import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MessageService } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { GastosService } from '../../../services/gastos.service';
import { GastosModel } from '../models/gastos.model';

@Component({
  selector: 'app-dialog-gasto',
  templateUrl: './dialog-gasto.component.html',
  styleUrls: ['./dialog-gasto.component.css']
})
export class DialogGastoComponent implements OnInit {

  @Output() verEvento = new EventEmitter<GastosModel>()
  public gastosModel = new GastosModel ();
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
      if(this.gastosModel?.idGastos > 0){
        this._gastosServices.putGastos(this.gastosModel).subscribe((data) => {
            this.messageService.add({severity:'success', summary: 'OK', detail: 'Los datos se actualizaron con éxito', life: 1500});
            this.verEvento.emit(this.gastosModel)
            form.resetForm()
            this.displayPosition = false;
          }, (error) => {
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Fallo en la operación', life: 1500});
          });
      }else{
        console.log(this.gastosModel);
        this._gastosServices.addGastos(this.gastosModel).subscribe((data) => {
            this.messageService.add({severity:'success', summary: 'OK', detail: 'Operación exitosa, los datos se han guardado', life: 1500});
            this.verEvento.emit(this.gastosModel)
            form.resetForm()
          }, (error) => {
            this.messageService.add({severity:'warn', summary: 'Error', detail: 'Error, los datos no se guardaron!', life: 1500});
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
    forma.resetForm()
  }
}
