import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroUsuarioRoutingModule } from './registro-usuario-routing.module';
import { RegistroUsuarioComponent } from './registro-usuario.component';


@NgModule({
  declarations: [
    RegistroUsuarioComponent
  ],
  imports: [
    CommonModule,
    RegistroUsuarioRoutingModule
  ]
})
export class RegistroUsuarioModule { }
