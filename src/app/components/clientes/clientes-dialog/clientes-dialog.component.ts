import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ClienteModel } from '../models/clienteModel';
import { NgForm } from '@angular/forms';
import { ClientesService } from 'src/app/services/clientes.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-clientes-dialog',
  templateUrl: './clientes-dialog.component.html',
  styleUrls: ['./clientes-dialog.component.css']
})
export class ClientesDialogComponent implements OnInit {
  @Output() verClienteComponent = new EventEmitter<ClienteModel>();
  public modeloCliente = new ClienteModel()
  displayPosition: boolean = false;
  position: string;
  constructor(private _clienteService: ClientesService,
              private messageService: MessageService ) { }

  ngOnInit(): void {
  }

  alamcenarCliente(form: NgForm){
    if(form.invalid){
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      })
    }else{
      if(this.modeloCliente?.id > 0){
        this._clienteService.editarCliente(this.modeloCliente).subscribe(data => {
          this.messageService.add({severity:'success', summary: 'OK', detail: 'Datos actualizados con éxito'});
          this.verClienteComponent.emit(this.modeloCliente);
          form.resetForm();
          this.displayPosition = false;
        }, (error) => {
          this.messageService.add({severity:'error', summary:'Error', detail:'Operación fallida, no se actualizó'});
        })
      }else{
        this._clienteService.guardarCliente(this.modeloCliente).subscribe(data => {
          this.messageService.add({severity:'success', summary: 'OK', detail: 'Operación realizada con éxito'});
          this.verClienteComponent.emit(this.modeloCliente);
          form.resetForm();
        }, (error) => {
          this.messageService.add({severity:'error', summary:'Error', detail:'Operación fallida'});
        })
      }
    }

  }

  showPositionDialog(cliente: ClienteModel){
    let position: string;
    this.position = position;
    this.displayPosition = true;
    if(cliente){
      this.modeloCliente = {...cliente};
    }
  }

  cerrarDialog(form: NgForm){
    this.displayPosition = false;
    form.resetForm();
  }
}
