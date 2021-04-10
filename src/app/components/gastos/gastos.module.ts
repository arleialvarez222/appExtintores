import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

import { GastosRoutingModule } from './gastos-routing.module';
import { GastosComponent } from './gastos.component';


@NgModule({
  declarations: [
    GastosComponent,
  ],
  imports: [
    CommonModule,
    GastosRoutingModule,
    TableModule,
    DialogModule,
    ButtonModule
  ]
})
export class GastosModule { }
