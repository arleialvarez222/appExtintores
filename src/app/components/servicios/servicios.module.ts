import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';

import { ServiciosRoutingModule } from './servicios-routing.module';
import { ServiciosComponent } from './servicios.component';



@NgModule({
  declarations: [
    ServiciosComponent,
  ],
  imports: [
    CommonModule,
    ServiciosRoutingModule,
    PaginatorModule

  ]
})
export class ServiciosModule { }
