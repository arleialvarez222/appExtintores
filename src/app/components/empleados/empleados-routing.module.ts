import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpleadosComponent } from './empleados.component';

const routes: Routes = [
  { path: 'empleados', component: EmpleadosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadosRoutingModule { }
