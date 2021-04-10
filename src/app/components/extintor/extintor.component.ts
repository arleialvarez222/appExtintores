import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServicePaisService } from '../../services/service-pais.service';

@Component({
  selector: 'app-extintor',
  templateUrl: './extintor.component.html',
  styleUrls: ['./extintor.component.css'],
  providers: [ HttpClient ]
})
export class ExtintorComponent implements OnInit {

  paises: any[] = []
  position: string
  displayPosition: boolean
  positionTipo: string
  display: boolean
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
  showPositionDialogTipo(positionTipo: string){
    this.position = positionTipo
    this.display = true
  }

}
