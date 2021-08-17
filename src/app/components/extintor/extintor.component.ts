import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExtintorService } from '../../services/extintor.service';
import { TipoModel, PesoModel } from './models/tipo-interface';
import { TipoExtintorComponent } from './tipo-extintor/tipo-extintor.component';
import { NgForm } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { PesoExtintorComponent } from './peso-extintor/peso-extintor.component';

@Component({
  selector: 'app-extintor',
  templateUrl: './extintor.component.html',
  styleUrls: ['./extintor.component.css'],
  providers: [ HttpClient, NgForm, MessageService, ConfirmationService ]
})
export class ExtintorComponent implements OnInit {

  public tipoExtintor = new TipoModel();
  public pesoExtintor = new PesoModel();
  tipo: TipoModel[] = [];
  peso: PesoModel[] = [];
  pesoList: PesoModel[] = [];
  tipoList: TipoModel[] = [];
  positionPeso: string;
  displayPosition: boolean;
  tipoDataItem;
  pesoDataItem;
  @ViewChild('tipoExtintorComponent') ad: TipoExtintorComponent;
  @ViewChild('pesoExtin') cp: PesoExtintorComponent;

  constructor(private _extintorService: ExtintorService,
              private messageService: MessageService,) { }

  ngOnInit(): void {
    this.verTipoExtintor();
    this.verPesoExtintor();
  }

  verTipoExtintor(){
    this._extintorService.mostrarTipo().subscribe(data => {
      let respuesta ;
      respuesta = data;
      this.tipo = respuesta?.data;
    }, (error) => {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'No se encontraron datos', life: 1500});
    })
  }

  verPesoExtintor(){
    this._extintorService.mostrarPeso().subscribe(data => {
      let res ;
      res = data;
      this.peso = res?.data;
    }, (error) => {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'No se encontraron datos', life: 1500});
    })
  }

  addItem($event){
    this.verTipoExtintor();
  }

  addItemPeso($event){
    this.verPesoExtintor();
  }

  onReject() {
    this.messageService.clear('b');
    this.messageService.add({severity:'warn', summary:'Cancelado', detail:'Se canceló la operación', life: 1500});
  }

  confirmarElimTipo(tipoId) {
    this.tipoDataItem = tipoId;
    this.messageService.clear();
    this.messageService.add({key: 'b', sticky: true, severity:'warn', summary:'Estas seguro de esta acción?', detail:'Confirmas que deceas eliminar esta información?', closable: false, data: tipoId, id: tipoId});
  }

  eliminarTipo(){
    this._extintorService.eliminarTipo(this?.tipoDataItem?.idTipoExtintor).subscribe((data) => {
      this.tipoList = this.tipoList?.filter((item) => {
        return item?.idTipoExtintor !== this?.tipoDataItem?.idTipoExtintor
      })
      this.verTipoExtintor();
      this.messageService.add({severity:'success', summary:'Exelente', detail:'Operación realizada con éxito', life: 1500});
    }), (error) => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Operación fallida, los datos no se eliminaron', life: 1500});
    }
      this.messageService.clear();
  }

  onRejectPeso() {
    this.messageService.clear('d');
    this.messageService.add({severity:'warn', summary:'Cancelado', detail:'Se canceló la operación', life: 1500});
  }

  confirmarElimPeso(pesoId) {
    this.pesoDataItem = pesoId;
    this.messageService.clear();
    this.messageService.add({key: 'd', sticky: true, severity:'warn', summary:'Estas seguro de esta acción?', detail:'Confirmas que deceas eliminar esta información?', closable: false, data: pesoId, id: pesoId});
  }

  eliminarPeso(){
    this._extintorService.eliminarPeso(this?.pesoDataItem?.idPesoExtintor).subscribe((data) => {
      this.pesoList = this.pesoList?.filter((item) => {
        return item?.idPesoExtintor !== this?.pesoDataItem?.idPesoExtintor
      })
      this.verPesoExtintor();
      this.messageService.add({severity:'success', summary:'Exelente', detail:'Operación realizada con éxito', life: 1500});
    }),(error) => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Operación fallida, los datos no se eliminaron', life: 1500});
    }
    this.messageService.clear();
  }

  showPositionDialog(tipo){
    this.ad.showPositionDialog(tipo);
  }

  showPositionDialogPeso(peso){
    this.cp.showPositionDialogPeso(peso);
  }
}
