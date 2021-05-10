import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PesoModel } from '../models/tipo-interface';
import { NgForm } from '@angular/forms';
import { ExtintorService } from '../../../services/extintor.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-peso-extintor',
  templateUrl: './peso-extintor.component.html',
  styleUrls: ['./peso-extintor.component.css'],
  providers:[NgForm, MessageService]
})
export class PesoExtintorComponent implements OnInit {
  @Output() verpeso = new EventEmitter<PesoModel>();
  pesoExt = new PesoModel();
  displayPeso:boolean = false;
  positionPeso:string;

  constructor(private _extintorPeso: ExtintorService,
              private messageService: MessageService) { }

  ngOnInit(): void {
  }

  nuevoPesoExtintor(formu: NgForm){
    if(formu.invalid){
      Object.values(formu.controls).forEach(control => {
        control.markAsTouched();
      })
    }else{
      if(this.pesoExt?.id > 0){
        this._extintorPeso.editarPeso(this.pesoExt).subscribe(data => {
          this.messageService.add({severity:'success', summary: 'OK', detail: 'Los datos se actualizarón con éxito'});
          this.verpeso.emit(this.pesoExt);
          formu.resetForm();
          this.displayPeso = false;
        })
      }else{
        this._extintorPeso.guardarPeso(this.pesoExt).subscribe(data => {
          this.messageService.add({severity:'success', summary: 'OK', detail: 'Los datos se guardaron con éxito'});
          this.verpeso.emit(this.pesoExt);
          formu.resetForm();
        }, (error) => {
          this.messageService.add({severity:'error', summary: 'OK', detail: 'Error al guardar los datos'});
        }
        )
      }
    }
  }

  showPositionDialogPeso(peso: PesoModel) {
    let positionPeso: string
    this.positionPeso = positionPeso;
    this.displayPeso = true;
   if(peso){
      this.pesoExt = {...peso};
    }
  }

  cerrarDialog(formu: NgForm) {
    this.displayPeso = false;
    formu.resetForm();
  }
}
