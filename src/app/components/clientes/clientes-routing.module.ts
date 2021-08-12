import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardsComponentGuard } from 'src/app/guards/guards-component.guard';
import { ClientesComponent } from './clientes.component';

const routes: Routes = [
  { path: 'clientes', component: ClientesComponent, canActivate: [GuardsComponentGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
