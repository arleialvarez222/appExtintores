import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule } from '@angular/forms'

import { FacturaRoutingModule } from './factura-routing.module';
import { FacturaComponent } from './factura.component';


@NgModule({
  declarations: [
    FacturaComponent,
  ],
  imports: [
    CommonModule,
    FacturaRoutingModule,
    TableModule,
    PaginatorModule,
    ButtonModule,
    DialogModule,
    ToastModule,
    ConfirmDialogModule,
    FormsModule
  ]
})
export class FacturaModule { }
