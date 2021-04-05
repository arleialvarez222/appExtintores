import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlmacenComponent } from './almacen.component';

const routes: Routes = [
  { path: 'almacen', component: AlmacenComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlmacenRoutingModule { }
