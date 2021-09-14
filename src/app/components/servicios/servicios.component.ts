import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiciosService } from '../../services/servicios.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css'],
  providers: [HttpClient, MessageService, ConfirmationService, NgForm ],
})
export class ServiciosComponent implements OnInit {
  public servicios: any[] =[]
  serviciosList: any[] =[]
  position: string
  displayPosition: boolean;
  servicioDataItem;

  constructor(private _httpServicio: ServiciosService,
              private messageService: MessageService,
              private router: Router ) { }

  ngOnInit(): void {
    this.obtenerServicio();
  }

  obtenerServicio(){
    this._httpServicio.consultarServicios().subscribe(data => {
      let respuesta;
      respuesta = data;
      this.servicios = respuesta?.data;
      //console.log(respuesta.data);
    })
  }

  onReject() {
    this.messageService.clear('k');
    this.messageService.add({severity:'warn', summary:'Cancelado', detail:'Se canceló la operación', life: 1500});
  }

  confirmarElimServicio(servicioId) {
    this.servicioDataItem = servicioId;
    this.messageService.clear();
    this.messageService.add({key: 'k', sticky: true, severity:'warn', summary:'Estas seguro de esta acción?', detail:'Confirmas que deceas eliminar esta información?', closable: false, data: servicioId, id: servicioId});
  }

  eliminarServicioId(){
    this._httpServicio.eliminarServicios(this?.servicioDataItem?.idServicios).subscribe(data => {
      this.serviciosList = this?.serviciosList?.filter(item => {
        return item?.idServicios !== this?.servicioDataItem?.idServicios;
      });
      this.obtenerServicio();
      this.messageService.add({severity:'success', summary:'Exelente', detail:'Operación realizada con éxito', life: 1500});
    }), (error) => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Error, los datos no se eliminaron', life: 1500});
    }
    this.messageService.clear();
  }

  showPositionService(idServicio: number) {
    this.router.navigate([`factura/${idServicio}`])
    console.log(idServicio);

  }

}
