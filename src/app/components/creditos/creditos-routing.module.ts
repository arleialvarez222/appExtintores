import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreditosComponent } from './creditos.component';

const routes: Routes = [
  { path: 'creditos', component: CreditosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditosRoutingModule { }
