import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

import { PreciosRoutingModule } from './precios-routing.module';
import { PreciosComponent } from './precios.component';


@NgModule({
  declarations: [
    PreciosComponent
  ],
  imports: [
    CommonModule,
    PreciosRoutingModule,
    TableModule,
    DialogModule,
    ButtonModule
  ]
})
export class PreciosModule { }
