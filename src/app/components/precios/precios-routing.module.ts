import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardsComponentGuard } from 'src/app/guards/guards-component.guard';
import { PreciosComponent } from './precios.component';

const routes: Routes = [
  { path: 'precios', component: PreciosComponent, canActivate: [GuardsComponentGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreciosRoutingModule { }
