import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

import { AlmacenRoutingModule } from './almacen-routing.module';
import { AlmacenComponent } from './almacen.component';


@NgModule({
  declarations: [
   AlmacenComponent
  ],
  imports: [
    CommonModule,
    AlmacenRoutingModule,
    TableModule,
    DialogModule,
    ButtonModule
  ]
})
export class AlmacenModule { }
