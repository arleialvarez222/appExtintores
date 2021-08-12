import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardsGuard } from 'src/app/guards/guards.guard';
import { RegistroUsuarioComponent } from '../registroUsuario/registro-usuario.component';

const routes: Routes = [
  {path: 'registro', component: RegistroUsuarioComponent, canActivate: [GuardsGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistroUsuarioRoutingModule { }
