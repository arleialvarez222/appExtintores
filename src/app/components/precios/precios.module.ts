import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { PreciosRoutingModule } from './precios-routing.module';
import { PreciosComponent } from './precios.component';
import { PrecioDialogComponent } from './precio-dialog/precio-dialog.component';


@NgModule({
  declarations: [
    PreciosComponent,
    PrecioDialogComponent
  ],
  imports: [
    CommonModule,
    PreciosRoutingModule,
    TableModule,
    DialogModule,
    ButtonModule,
    FormsModule,
    PaginatorModule,
    ToastModule,
    ConfirmDialogModule
  ]
})
export class PreciosModule { }
