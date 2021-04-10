import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';

import { CreditosRoutingModule } from './creditos-routing.module';
import { CreditosComponent } from './creditos.component';


@NgModule({
  declarations: [
    CreditosComponent
  ],
  imports: [
    CommonModule,
    CreditosRoutingModule,
    PaginatorModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    InputNumberModule
  ]
})
export class CreditosModule { }
