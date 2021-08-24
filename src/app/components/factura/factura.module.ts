import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule } from '@angular/forms'

import { FacturaRoutingModule } from './factura-routing.module';
import { FacturaComponent } from './factura.component';

//servicios
import { ClientesService } from '../../services/clientes.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { ExtintorService } from 'src/app/services/extintor.service';
import { ServiciosService } from '../../services/servicios.service';


@NgModule({
  declarations: [
    FacturaComponent,
  ],
  imports: [
    CommonModule,
    FacturaRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TableModule,
    PaginatorModule,
    ButtonModule,
    ToastModule,
    ConfirmDialogModule,
    FormsModule
  ],
  providers: [
    ClientesService,
    EmpleadoService,
    ExtintorService,
    ServiciosService,
  ]
})
export class FacturaModule { }
