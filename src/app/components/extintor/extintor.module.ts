import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExtintorRoutingModule } from './extintor-routing.module';
import { ExtintorComponent } from './extintor.component';


@NgModule({
  declarations: [
    ExtintorComponent
  ],
  imports: [
    CommonModule,
    ExtintorRoutingModule
  ]
})
export class ExtintorModule { }
