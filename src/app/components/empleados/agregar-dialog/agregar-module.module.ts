import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

import { AgregarDialogComponent } from './agregar-dialog.component';

@NgModule({
  declarations: [
    AgregarDialogComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    ToastModule
  ]
})
export class AgregarModuleModule { }
