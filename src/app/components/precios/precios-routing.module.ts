import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreciosComponent } from './precios.component';

const routes: Routes = [
  { path: 'precios', component: PreciosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreciosRoutingModule { }
