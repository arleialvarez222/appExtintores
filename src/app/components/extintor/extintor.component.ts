import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExtintorService } from '../../services/extintor.service';
import { TipoModel, PesoModel } from './models/tipo-interface';
import { TipoExtintorComponent } from './tipo-extintor/tipo-extintor.component';
import { NgForm } from '@angular/forms';
import { MessageService, ConfirmationService, ConfirmEventType } from 'primeng/api';
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
  @ViewChild('tipoExtintorComponent') ad: TipoExtintorComponent;
  @ViewChild('pesoExtin') cp: PesoExtintorComponent;

  constructor(private _extintorService: ExtintorService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) { }

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
      this.messageService.add({severity:'error', summary: 'Error', detail: 'No se encontraron datos'});
    })
  }

  verPesoExtintor(){
    this._extintorService.mostrarPeso().subscribe(data => {
      let res ;
      res = data;
      this.peso = res?.data;
    }, (error) => {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'No se encontraron datos'});
    })
  }

  addItem($event){
    this.verTipoExtintor();
  }

  addItemPeso($event){
    this.verPesoExtintor();
  }

  eliminarTipo(tipoData){
    this.confirmationService.confirm({
      message: 'Esta seguro que decea eliminar este dato?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._extintorService.eliminarTipo(tipoData.id).subscribe(
        (data) => {
          this.tipoList = this.tipoList.filter((item) => {
            return item.id !== tipoData.id
          })
          this.verTipoExtintor();
        })
          this.messageService.add({severity:'success', summary:'Exelente', detail:'Operación realizada con éxito'});
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

  eliminarPeso(pesoData){
    this.confirmationService.confirm({
      message: 'Esta seguro que decea eliminar este dato?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._extintorService.eliminarPeso(pesoData.id).subscribe(
          (data) => {
            this.pesoList = this.pesoList.filter((item) => {
              return item.id !== pesoData.id
            })
            this.verPesoExtintor();
          })
          this.messageService.add({severity:'success', summary:'Exelente', detail:'Operación realizada con éxito'});
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

  showPositionDialog(tipo){
    this.ad.showPositionDialog(tipo);
  }

  showPositionDialogPeso(peso){
    this.cp.showPositionDialogPeso(peso);
  }
}
