import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule } from '@angular/forms'

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesComponent } from './clientes.component';
import { ClientesDialogComponent } from './clientes-dialog/clientes-dialog.component';



@NgModule({
  declarations: [
    ClientesComponent,
    ClientesDialogComponent,
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    PaginatorModule,
    TableModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    ToastModule,
    ConfirmDialogModule
  ]
})
export class ClientesModule { }
