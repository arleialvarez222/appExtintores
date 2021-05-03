import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GastosService } from '../../services/gastos.service';
import { GastosModel } from './models/gastos.model';
import { MessageService } from 'primeng/api';
import { NgForm, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2'
import * as moment from 'moment';
import { DialogGastoComponent } from './dialog-gasto/dialog-gasto.component';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css'],
  providers: [HttpClient, MessageService, NgForm],
})

export class GastosComponent implements OnInit {

  public gastosModel = new GastosModel(0, '', '', 0, 0 );
  gastos: GastosModel[] = [];
  gastosDelet: GastosModel[] = []
  position: string;
  displayPosition: boolean;
  buscarDescripcion = '';
  @ViewChild('verDialogGasto') ad: DialogGastoComponent
  constructor(
    private _gastosServices: GastosService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.getGastos();
  }

  getGastos() {
    this._gastosServices.getAllGastos().subscribe((resp) => {
        this.gastos = resp;
      }, (error) => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'No se encontraron datos'});
      });
  }

  addItem($event){
    this.getGastos();
  }

  buscarGasto(){
    this._gastosServices.getBuscar(this.buscarDescripcion).subscribe((resp) => {
      this.gastos = resp;
    }, (error) => {
      this.messageService.add({severity:'error', summary: 'Error', detail: 'No se encontraron datos'});
    });
  }

  deletGastoDb(gastosData){
    Swal.fire({
      title: '¿Seguro que quieres eliminar este dato?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._gastosServices.deleteGastos(gastosData.id).subscribe(
          (data) => {
            this.getGastos()
            this.gastosDelet = this.gastosDelet.filter((item) => {
              return item.id !== gastosData.id
            })
          }, (error) => {
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Fallo intentando eliminar'})
          })
        Swal.fire(
          'Exelente!',
          'Dato eliminado',
          'success'
        )
      }
    })
  }

  showPositionDialog(gastos) {
   this.ad.showPositionDialog(gastos)
  }

}
