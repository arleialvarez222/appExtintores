import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { CreditosRoutingModule } from './creditos-routing.module';
import { CreditosComponent } from './creditos.component';
import { DialogServiceComponent } from './dialog-service/dialog-service.component';


@NgModule({
  declarations: [
    CreditosComponent,
    DialogServiceComponent
  ],
  imports: [
    CommonModule,
    CreditosRoutingModule,
    PaginatorModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    FormsModule,
    ToastModule,
    ConfirmDialogModule,
  ]
})
export class CreditosModule { }
