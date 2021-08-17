import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CreditoModel } from '../models/creditoModel';
import { CreditosService } from '../../../services/creditos.service';
import { ServiciosService } from '../../../services/servicios.service';
import { ServicioModel } from '../../servicios/modelos/serviciosModel';

@Component({
  selector: 'app-dialog-service',
  templateUrl: './dialog-service.component.html',
  styleUrls: ['./dialog-service.component.css'],
  providers: [ HttpClient, MessageService, ConfirmationService, NgForm ]
})
export class DialogServiceComponent implements OnInit {
  public creditoModel = new CreditoModel();
  @Output() verCredito = new EventEmitter();
  displayPosition: boolean;
  position: string;
  servicios: ServicioModel[] = [];

  constructor(private messageService: MessageService,
              private _creditoService: CreditosService,
              private _servicioService: ServiciosService) { }

  ngOnInit(): void {
  }

  obtenerServicios(){
    this._servicioService.consultarServicios().subscribe(data => {
      let respuesta;
      respuesta = data;
      this.servicios = respuesta?.data;
    })
  }

  guardarCredito(form: NgForm){
    if(form.invalid){
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      })
    }else{
      this._creditoService.agregarAbono(this?.creditoModel).subscribe(data => {
        this.messageService.add({severity:'success', summary: 'OK', detail: 'Los datos se guardaron correctamente', life: 1500});
        this.verCredito.emit(this?.creditoModel);
        form.resetForm();
      }), (error) => {
        this.messageService.add({severity:'error', summary:'Error', detail:'Operación fallida, los datos no se guardaron', life: 1500});
      }
    }
  }

  showPositionDialog(credito){
    let position: string;
    this.position = position
    this.displayPosition = true
    if(credito){
      this.creditoModel = JSON.parse(JSON.stringify(credito))
    }
  }

  cerrarDialog(form: NgForm) {
    this.displayPosition = false;
    form.resetForm();
  }

}
