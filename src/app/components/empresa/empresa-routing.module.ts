import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardsComponentGuard } from 'src/app/guards/guards-component.guard';
import { EmpresaComponent } from './empresa.component';

const routes: Routes = [
  { path:'empresa', component: EmpresaComponent, canActivate: [GuardsComponentGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresaRoutingModule { }
