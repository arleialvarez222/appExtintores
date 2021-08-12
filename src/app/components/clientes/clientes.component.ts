import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api'
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
  clienteDataItem;
  @ViewChild('clienteComponent') ad: ClientesDialogComponent;

  constructor(private _clienteService: ClientesService,
              private messageService: MessageService) { }

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

  onReject() {
    this.messageService.clear('i');
    this.messageService.add({severity:'warn', summary:'Cancelado', detail:'Se canceló la operación', life: 1500});
  }

  confirmarElimCliente(clienteId) {
    this.clienteDataItem = clienteId;
    this.messageService.clear();
    this.messageService.add({key: 'i', sticky: true, severity:'warn', summary:'Estas seguro de esta acción?', detail:'Confirmas que deceas eliminar esta información?', closable: false, data: clienteId, id: clienteId});
  }

  eliminarCliente(){
    this._clienteService.eliminarClientes(this?.clienteDataItem?.id).subscribe((data) => {
      this.clienteDelet = this.clienteDelet.filter((item) => {
        return item.id !== this?.clienteDataItem?.id
      })
      this.consultandoCliente();
      this.messageService.add({severity:'success', summary:'Exelente', detail:'Operación realizada con éxito', life: 1500});
    }, (error) => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Operación fallida, los datos no se eliminaron', life: 1500});
    })
    this.messageService.clear();
  }

  showPositionDialog(cliente){
    this.ad.showPositionDialog(cliente);
  }

  detalleExtintor(positionDetail: string){
    this.position = positionDetail;
    this.detailExtintor = true;

  }

}
