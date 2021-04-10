import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServicePaisService } from '../../services/service-pais.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
  providers: [HttpClient]
})
export class ClientesComponent implements OnInit {

paises: any[] = []
position:string
displayPosition:boolean
positionEdit:string
editarCliente:boolean
detailExtintor:boolean
positionDetail: string
value1: string
value6: string

  constructor(private paisService: ServicePaisService) { }

  ngOnInit(): void {
    this.paisService.getPaises().subscribe(paises =>{
       this.paises = paises
    }
     )
  }
  showPositionDialog(position: string){
    this.position = position;
    this.displayPosition = true;

  }
  editarClient(positionEdit: string){
    this.position = positionEdit;
    this.editarCliente = true;

  }
  detalleExtintor(positionDetail: string){
    this.position = positionDetail;
    this.detailExtintor = true;

  }

}
