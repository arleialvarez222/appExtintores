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
      if(this.modeloCliente?.idCliente > 0){
        this._clienteService.editarCliente(this?.modeloCliente).subscribe(data => {
          this.messageService.add({severity:'success', summary: 'OK', detail: 'Los datos se actualizaron con éxito', life: 1500});
          this.verClienteComponent.emit(this?.modeloCliente);
          form.resetForm();
          this.displayPosition = false;
        }, (error) => {
          this.messageService.add({severity:'error', summary:'Error', detail:'Operación fallida, los datos no se actualizaron', life: 1500});
        })
      }else{
        this._clienteService.guardarCliente(this?.modeloCliente).subscribe(data => {
          this.messageService.add({severity:'success', summary: 'OK', detail: 'Operación exitosa, los datos se guardaron exitosamente', life: 1500});
          this.verClienteComponent.emit(this?.modeloCliente);
          form.resetForm();
        }, (error) => {
          this.messageService.add({severity:'error', summary:'Error', detail:'Operación fallida, los datos no se guardaron', life: 1500});
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
