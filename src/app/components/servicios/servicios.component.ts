import { Component, OnInit } from '@angular/core';
import { ServicePaisService } from '../../services/service-pais.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css'],
  providers: [HttpClient],
})
export class ServiciosComponent implements OnInit {
  paises: any[] =[]
  position: string
  displayPosition: boolean;

  constructor(private paisService: ServicePaisService) { }

  ngOnInit(): void {
    this.paisService.getPaises()
    .subscribe( paises => {
      this.paises = paises
    })
  }
  showPositionDialog(position: string) {
    this.position = position;
    this.displayPosition = true;
  }

}
