import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

import { ExtintorRoutingModule } from './extintor-routing.module';
import { ExtintorComponent } from './extintor.component';


@NgModule({
  declarations: [
    ExtintorComponent
  ],
  imports: [
    CommonModule,
    ExtintorRoutingModule,
    TableModule,
    DialogModule,
    ButtonModule
  ]
})
export class ExtintorModule { }
