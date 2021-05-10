import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { PaginatorModule } from 'primeng/paginator';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { ExtintorService } from '../../services/extintor.service'

import { ExtintorRoutingModule } from './extintor-routing.module';
import { ExtintorComponent } from './extintor.component';
import { TipoExtintorComponent } from './tipo-extintor/tipo-extintor.component';
import { PesoExtintorComponent } from './peso-extintor/peso-extintor.component';


@NgModule({
  declarations: [
    ExtintorComponent,
    TipoExtintorComponent,
    PesoExtintorComponent
  ],
  imports: [
    CommonModule,
    ExtintorRoutingModule,
    TableModule,
    DialogModule,
    ButtonModule,
    ToastModule,
    FormsModule,
    PaginatorModule,
    ConfirmDialogModule,
  ],
  providers: [
    ExtintorService,
  ]
})
export class ExtintorModule { }
