import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardsComponentGuard } from 'src/app/guards/guards-component.guard';
import { FacturaComponent } from './factura.component';

const routes: Routes = [
  { path: 'factura', component: FacturaComponent, canActivate: [GuardsComponentGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacturaRoutingModule { }
