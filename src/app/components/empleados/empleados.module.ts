import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';

import { EmpleadoService } from '../../services/empleado.service';

import { EmpleadosRoutingModule } from './empleados-routing.module';
import { EmpleadosComponent } from './empleados.component';
import { AgregarDialogComponent } from './agregar-dialog/agregar-dialog.component';


@NgModule({
  declarations: [
    EmpleadosComponent,
    AgregarDialogComponent,
  ],
  imports: [
    CommonModule,
    EmpleadosRoutingModule,
    PaginatorModule,
    TableModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    ToastModule,
    InputTextModule
  ],
  providers: [
    EmpleadoService
  ]
})
export class EmpleadosModule { }
