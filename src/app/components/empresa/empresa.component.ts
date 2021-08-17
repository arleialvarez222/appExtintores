import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmpresaModel } from './models/modelEmpresa';
import { EmpresaService } from '../../services/empresa.service';
import { NgForm } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
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
  empresaDataItem;
  @ViewChild('agregarDialogEmpresa') ad: EmpresaDiaolgComponent;

  constructor( private _empresaService: EmpresaService,
               private messageService: MessageService,) { }

  ngOnInit(): void {
    this.verEmpresas()
  }

  verEmpresas(){
    this._empresaService.consultarEmpresa().subscribe(data => {
      let resp
      resp = data
      this.empresa = resp?.data
    }),(error)=> {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'No se encontraron datos para mostrar', life: 1500});
    }
  }

  addItem($event){
    this.verEmpresas();
  }

  onReject() {
    this.messageService.clear('a');
    this.messageService.add({severity:'warn', summary:'Cancelado', detail:'Se canceló la operación', life: 1500});
  }

  confirmarElimEmpresa(empresaId) {
    this.empresaDataItem = empresaId;
    this.messageService.clear();
    this.messageService.add({key: 'a', sticky: true, severity:'warn', summary:'Estas seguro de esta acción?', detail:'Confirmas que deceas eliminar esta información?', closable: false, data: empresaId, id: empresaId});
  }

  eliminarEmpresaId(){
    this._empresaService.eliminarEmpresa(this?.empresaDataItem?.idEmpresa).subscribe((data) => {
      this.empresaDelet = this.empresaDelet.filter((item) => {
        return item.idEmpresa !== this?.empresaDataItem?.idEmpresa
      })
      this.verEmpresas();
      this.messageService.add({severity:'success', summary:'Exelente', detail:'Operación realizada con éxito, datos eliminados'});
    }, (error) => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Operación fallida, los datos no se eliminaron'});
    })
    this.messageService.clear();
  }

  showPositionDialog(empresa){
    this.ad.showPositionDialog(empresa);
  }
}
