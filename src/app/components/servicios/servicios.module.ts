import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { ServiciosRoutingModule } from './servicios-routing.module';
import { ServiciosComponent } from './servicios.component';
import { HttpClientModule } from '@angular/common/http';
import { ServiciosService } from '../../services/servicios.service';



@NgModule({
  declarations: [
    ServiciosComponent,
  ],
  imports: [
    CommonModule,
    ServiciosRoutingModule,
    PaginatorModule,
    TableModule,
    ButtonModule,
    HttpClientModule,
    DialogModule,
    FormsModule,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [
    ServiciosService
  ]
})
export class ServiciosModule { }
