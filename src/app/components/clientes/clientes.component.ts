import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MessageService, ConfirmationService, ConfirmEventType } from 'primeng/api'
import { NgForm } from '@angular/forms';
import { ClienteModel } from './models/clienteModel';
import { ClientesService } from '../../services/clientes.service';
import { ClientesDialogComponent } from './clientes-dialog/clientes-dialog.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
  providers: [MessageService, ConfirmationService, NgForm]
})
export class ClientesComponent implements OnInit {
public modeloCliente = new ClienteModel()
cliente: ClienteModel[] = [];
clienteDelet: ClienteModel[] = [];
position:string;
displayPosition:boolean;
detailExtintor:boolean;
positionDetail: string;
busquedaCliente = '';
@ViewChild('clienteComponent') ad: ClientesDialogComponent;
  constructor(private _clienteService: ClientesService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.consultandoCliente();
  }

  consultandoCliente(){
    this._clienteService.consultarCliente().subscribe(data => {
      let respuesta;
      respuesta = data;
      this.cliente = respuesta?.data;
    }, (error) => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Operación fallida'});
    })
  }

  AddItem($event){
    this.consultandoCliente();
  }

  eliminarCliente(eliminarData){
    this.confirmationService.confirm({
      message: 'Esta seguro que decea eliminar este dato?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._clienteService.eliminarClientes(eliminarData.id).subscribe(
        (data) => {
          this.clienteDelet = this.clienteDelet.filter((item) => {
            return item.id !== eliminarData.id
          })
          this.consultandoCliente();
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

  showPositionDialog(cliente){
    this.ad.showPositionDialog(cliente);
  }

  detalleExtintor(positionDetail: string){
    this.position = positionDetail;
    this.detailExtintor = true;

  }

}
