import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServicePaisService } from '../../services/service-pais.service';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css'],
  providers: [ HttpClient ]
})
export class GastosComponent implements OnInit {

  paises: any[] = []
  position: string
  displayPosition: boolean
  positionEdit: string
  editGasto: boolean

  constructor(private paisService: ServicePaisService) { }

  ngOnInit(): void {
    this.paisService.getPaises().subscribe( paises => {
      this.paises = paises
    })
  }
  showPositionDialog(position: string){
    this.position = position
    this.displayPosition = true
  }
  editarGasto(positionEdit: string){
    this.position = positionEdit
    this.editGasto = true
  }
}
