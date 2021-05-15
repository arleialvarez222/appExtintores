import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { InventarioService } from '../../services/inventario.service';
import { ExtintorService } from '../../services/extintor.service';

import { AlmacenRoutingModule } from './almacen-routing.module';
import { AlmacenComponent } from './almacen.component';
import { AlmacenDialogComponent } from './almacen-dialog/almacen-dialog.component';


@NgModule({
  declarations: [
   AlmacenComponent,
   AlmacenDialogComponent
  ],
  imports: [
    CommonModule,
    AlmacenRoutingModule,
    TableModule,
    DialogModule,
    ButtonModule,
    ConfirmDialogModule,
    PaginatorModule,
    ToastModule,
    FormsModule,
  ],
  providers:[
    InventarioService,
    ExtintorService
  ]
})
export class AlmacenModule { }
