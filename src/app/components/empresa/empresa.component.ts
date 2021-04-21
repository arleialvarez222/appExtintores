import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmpresaModel } from './modelEmpresa';
import { EmpresaService } from '../../services/empresa.service';


@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css'],
  providers: [ HttpClient ]
})
export class EmpresaComponent implements OnInit {

empresa = []
  constructor( private _empresaService: EmpresaService ) { }

  ngOnInit(): void {
    this.verEmpresas()
  }

  verEmpresas(){
    this._empresaService.consultarEmpresa().subscribe(data => {
      let resp
      resp = data
      this.empresa = resp?.data
      console.log(this.empresa)
    })
  }

  editarEmpresa(){

  }
}
