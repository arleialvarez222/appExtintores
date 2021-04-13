import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

import { GastosService } from '../../services/gastos.service';

import { GastosRoutingModule } from './gastos-routing.module';
import { GastosComponent } from './gastos.component';

@NgModule({
  declarations: [
    GastosComponent,
  ],
  imports: [
    CommonModule,
    GastosRoutingModule,
    TableModule,
    DialogModule,
    ButtonModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastModule,
    FormsModule

  ],
  providers: [
    GastosService
  ]
})
export class GastosModule { }
