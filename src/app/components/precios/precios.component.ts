import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServicePaisService } from '../../services/service-pais.service';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.css'],
  providers: [ HttpClient ]
})
export class PreciosComponent implements OnInit {

  paises: any[] = []
  position: string
  displayPosition: boolean
  positionEdit: string
  editarPrice: boolean
  constructor(private paisSsevice: ServicePaisService) { }

  ngOnInit(): void {
    this.paisSsevice.getPaises().subscribe(paises=>{
      this.paises = paises
    })
  }
  addItem(){

  }

  showPositionDialog(position: string){
    this.position = position
    this.displayPosition = true
  }
  editarPrecio(positionEdit: string){
    this.position = positionEdit
    this.editarPrice = true
  }
}
