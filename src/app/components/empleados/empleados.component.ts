import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServicePaisService } from '../../services/service-pais.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css'],
  providers: [ HttpClient ]
})
export class EmpleadosComponent implements OnInit {

  paises: any[] =[]
  position: string
  displayPosition: boolean
  positionEdit: string
  editarEmpleado: boolean
  constructor(private paisService: ServicePaisService) { }

  ngOnInit(): void {
    this.paisService.getPaises().subscribe(paises =>{
      this.paises = paises
    })
  }
  showPositionDialog(position: string){
    this.position = position;
    this.displayPosition = true;

  }
  editarEmployee(positionEdit: string){
    this.position = positionEdit;
    this.editarEmpleado = true;

  }
}
