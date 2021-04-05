import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExtintorComponent } from './extintor.component';

const routes: Routes = [
  { path: 'extintor', component: ExtintorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtintorRoutingModule { }
