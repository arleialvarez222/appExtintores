import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmpresaModel } from '../models/modelEmpresa';
import { EmpresaService } from '../../../services/empresa.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-empresa-diaolg',
  templateUrl: './empresa-diaolg.component.html',
  styleUrls: ['./empresa-diaolg.component.css'],
  providers: [ MessageService, NgForm ]
})
export class EmpresaDiaolgComponent implements OnInit {
  @Output() verEmpresa = new EventEmitter<EmpresaModel>();
  public empresaModel = new EmpresaModel();
  displayPosition: boolean = false;
  position: string;
  constructor(private _empresaService: EmpresaService,
              private messageService: MessageService) { }

  ngOnInit(): void {
  }

  postEmpresa(form: NgForm){
    if(form.invalid){
      Object.values(form.controls).forEach(control => {
        control.markAsTouched()
      })
    }else{
      if(this.empresaModel?.id > 0){
        this._empresaService.editarEmpresa(this.empresaModel).subscribe( data => {
          this.messageService.add({severity:'success', summary: 'OK', detail: 'Los datos se actualizaron con éxito', life: 1500});
          this.verEmpresa.emit(this.empresaModel)
          form.resetForm()
         this.displayPosition = false
        }, (error) =>{
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Fallo al actualizar los datos', life: 1500});
        })
      }else{
        this._empresaService.guardarEmpresa(this.empresaModel).subscribe( data => {
          this.messageService.add({severity:'success', summary: 'OK', detail: 'Operación exitosa, los datos se han guardado', life: 1500});
              this.verEmpresa.emit(this.empresaModel)
              form.resetForm()
        }, (error) => {
          this.messageService.add({severity:'error', summary: 'Error', detail: ' Se encontro un error, verificar que los campos esten completos', life: 1500});
        })
      }
    }
  }

  showPositionDialog(empresa: EmpresaModel) {
    let position: string
    this.position = position;
    this.displayPosition = true;
    if(empresa){
      this.empresaModel = {...empresa};
    }
  }

  cerrarDialog(forma: NgForm) {
    this.displayPosition = false;
    forma.resetForm()
  }
}
