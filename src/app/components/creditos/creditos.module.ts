import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreditosRoutingModule } from './creditos-routing.module';
import { CreditosComponent } from './creditos.component';


@NgModule({
  declarations: [
    CreditosComponent
  ],
  imports: [
    CommonModule,
    CreditosRoutingModule
  ]
})
export class CreditosModule { }
