import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { GastosService } from '../../services/gastos.service';

import { GastosRoutingModule } from './gastos-routing.module';
import { GastosComponent } from './gastos.component';
import { DialogGastoComponent } from './dialog-gasto/dialog-gasto.component';

@NgModule({
  declarations: [
    GastosComponent,
    DialogGastoComponent,
  ],
  imports: [
    CommonModule,
    GastosRoutingModule,
    TableModule,
    DialogModule,
    ButtonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastModule,
    FormsModule,
    InputTextModule,
    PaginatorModule,
    ConfirmDialogModule

  ],
  providers: [
    GastosService
  ]
})
export class GastosModule { }
