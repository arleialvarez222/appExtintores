import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmpresaModel } from './models/modelEmpresa';
import { EmpresaService } from '../../services/empresa.service';
import { NgForm } from '@angular/forms';
import { MessageService, ConfirmationService, ConfirmEventType } from 'primeng/api';
import { EmpresaDiaolgComponent } from './empresa-diaolg/empresa-diaolg.component';


@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css'],
  providers: [ HttpClient, MessageService, ConfirmationService, NgForm ]
})
export class EmpresaComponent implements OnInit {
public empresaModel = new EmpresaModel();
empresa: EmpresaModel[] = [];
empresaDelet: EmpresaModel[] = [];
@ViewChild('agregarDialogEmpresa') ad: EmpresaDiaolgComponent;
  constructor( private _empresaService: EmpresaService,
               private messageService: MessageService,
               private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.verEmpresas()
  }

  verEmpresas(){
    this._empresaService.consultarEmpresa().subscribe(data => {
      let resp
      resp = data
      this.empresa = resp?.data
    })
  }

  addItem($event){
    this.verEmpresas();
  }

  eliminarEmpresaId(empresaData){
    this.confirmationService.confirm({
      message: 'Esta seguro que decea eliminar este dato?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._empresaService.eliminarEmpresa(empresaData.id).subscribe(
        (data) => {
          this.empresaDelet = this.empresaDelet.filter((item) => {
            return item.id !== empresaData.id
          })
          this.verEmpresas();
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

  showPositionDialog(empresa){
    this.ad.showPositionDialog(empresa);
  }
}
