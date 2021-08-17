import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogServiceComponent } from './dialog-service/dialog-service.component';
import { CreditoModel } from './models/creditoModel';
import { CreditosService } from '../../services/creditos.service';

@Component({
  selector: 'app-creditos',
  templateUrl: './creditos.component.html',
  styleUrls: ['./creditos.component.css']
})
export class CreditosComponent implements OnInit {
  public creditoModel = new CreditoModel();
  creditos:CreditoModel[] = [];
  position:string;
  displayPosition: boolean;
  buscarDescripcion = '';
  @ViewChild('agregarDialogServicio') ad:DialogServiceComponent;

  constructor(private _creditoService: CreditosService) { }

  ngOnInit(): void {
    this.obtenerCredito();
  }

  obtenerCredito(){
    this._creditoService.consultarCredito().subscribe(data => {
      let resp;
      resp = data;
      this.creditos = resp?.data;
    })
  }

  buscarServicio(){

  }

  addItem($event){
    this.obtenerCredito();
  }

  showPositionDialog(servicios){
    this.ad.showPositionDialog(servicios);
  }
}
