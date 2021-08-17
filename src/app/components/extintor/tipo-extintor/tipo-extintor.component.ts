import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TipoModel } from '../models/tipo-interface';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ExtintorService } from '../../../services/extintor.service';

@Component({
  selector: 'app-tipo-extintor',
  templateUrl: './tipo-extintor.component.html',
  styleUrls: ['./tipo-extintor.component.css'],
  providers: [MessageService, NgForm],
})
export class TipoExtintorComponent implements OnInit {
  @Output() nuevoExtintor = new EventEmitter<TipoModel>();
  tipoExt: TipoModel = new TipoModel()    ;
  display: boolean = false;
  position: string;

  constructor(
    private _tipoService: ExtintorService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  nuevoTipoExtintor(form: NgForm) {
    if (form.invalid) {
      Object.values(form.controls).forEach((control) => {
        control.markAsTouched();
      });
    } else {
      if (this.tipoExt?.idTipoExtintor > 0) {
        this._tipoService.editarTipo(this?.tipoExt).subscribe((data) => {
            this.messageService.add({severity: 'success', summary: 'OK', detail: 'Los datos se actualizaron con éxito', life: 1500 });
            this.nuevoExtintor.emit(this?.tipoExt);
            form.resetForm();
            this.display = false;
          },
          (error) => {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Se encontró un error, fallo al actualizar los datos', life: 1500});
          }
        );
      } else {
        this._tipoService.guardarTipo(this?.tipoExt).subscribe((data) => {
            this.messageService.add({severity: 'success', summary: 'OK', detail: 'Los datos se guardaron con éxito', life: 1500});
            this.nuevoExtintor.emit(this?.tipoExt);
            form.resetForm();
          },
          (error) => {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Verificar que los campos esten completos', life: 1500});
          }
        );
      }
    }
  }

  showPositionDialog(tipo: TipoModel) {
    let position: string;
    this.position = position;
    this.display = true;
    if (tipo) {
      this.tipoExt = { ...tipo };
    }
  }

  cerrarDialog(form: NgForm) {
    this.display = false;
    form.resetForm();
  }
}
