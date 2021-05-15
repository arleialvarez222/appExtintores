import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { ProductoService } from '../../services/producto.service'

import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosComponent } from '../productos/productos.component';
import { ProductosDialogComponent } from './productos-dialog/productos-dialog.component';


@NgModule({
  declarations: [
    ProductosComponent,
    ProductosDialogComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    DialogModule,
    ButtonModule,
    PaginatorModule,
    ToastModule,
    FormsModule,
    ConfirmDialogModule,
    ProductosRoutingModule,
  ],
  providers:[
    ProductoService
  ]
})
export class ProductosModule { }
