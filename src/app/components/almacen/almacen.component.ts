import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServicePaisService } from '../../services/service-pais.service';

@Component({
  selector: 'app-almacen',
  templateUrl: './almacen.component.html',
  styleUrls: ['./almacen.component.css'],
  providers: [ HttpClient ]
})
export class AlmacenComponent implements OnInit {

    paises: any[] = []
    position: string
    displayPosition: boolean
    positionEdit: string
    editStock: boolean
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
  editarStock(positionEdit: string){
    this.position = positionEdit
    this.editStock = true
  }
}
