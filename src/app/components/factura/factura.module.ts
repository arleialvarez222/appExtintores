import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeNG/table';

import { FacturaRoutingModule } from './factura-routing.module';
import { FacturaComponent } from './factura.component';


@NgModule({
  declarations: [
    FacturaComponent,
  ],
  imports: [
    CommonModule,
    FacturaRoutingModule,
    TableModule
  ]
})
export class FacturaModule { }
