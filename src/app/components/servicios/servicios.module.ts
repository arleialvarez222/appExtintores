import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

import { ServiciosRoutingModule } from './servicios-routing.module';
import { ServiciosComponent } from './servicios.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';



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
    DialogModule
  ]
})
export class ServiciosModule { }
