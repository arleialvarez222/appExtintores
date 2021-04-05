import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GastosComponent } from './gastos.component';

const routes: Routes = [
  { path: 'gastos', component: GastosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GastosRoutingModule { }
