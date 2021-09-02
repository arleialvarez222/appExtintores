import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

import { RegistroUsuarioRoutingModule } from './registro-usuario-routing.module';
import { RegistroUsuarioComponent } from './registro-usuario.component';

import { AuthService } from 'src/app/services/auth.service';


@NgModule({
  declarations: [
    RegistroUsuarioComponent
  ],
  imports: [
    CommonModule,
    RegistroUsuarioRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ButtonModule,
    ToastModule,
    FormsModule,
  ],
  providers: [
    AuthService
  ]
})
export class RegistroUsuarioModule { }
