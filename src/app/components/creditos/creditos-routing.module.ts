import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardsComponentGuard } from 'src/app/guards/guards-component.guard';
import { CreditosComponent } from './creditos.component';

const routes: Routes = [
  { path: 'creditos', component: CreditosComponent, canActivate: [GuardsComponentGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditosRoutingModule { }
