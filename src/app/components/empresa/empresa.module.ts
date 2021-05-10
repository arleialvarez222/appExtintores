import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { PaginatorModule } from 'primeng/paginator';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { EmpresaService } from '../../services/empresa.service'

import { EmpresaRoutingModule } from './empresa-routing.module';
import { EmpresaComponent } from './empresa.component';
import { EmpresaDiaolgComponent } from './empresa-diaolg/empresa-diaolg.component';


@NgModule({
  declarations: [
    EmpresaComponent,
    EmpresaDiaolgComponent
  ],
  imports: [
    CommonModule,
    EmpresaRoutingModule,
    TableModule,
    DialogModule,
    ButtonModule,
    FormsModule,
    ToastModule,
    PaginatorModule,
    ConfirmDialogModule
  ],
  providers: [
    EmpresaService
  ]
})
export class EmpresaModule { }
