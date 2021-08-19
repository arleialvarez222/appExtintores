import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { RegistroModel } from './modelo/registro-model';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css'],
  providers: [ MessageService, NgForm ]
})
export class RegistroUsuarioComponent implements OnInit {

  public user: RegistroModel = {
    nombres: '',
    apellidos: '',
    email: '',
    userName: '',
    password: '',
    confirmPassword: '',
    clientURI: 'registro de usuario',
  }

  constructor(private _authService: AuthService,
              private messageService: MessageService,) { }

  ngOnInit(): void {
  }

  registrarUsuario(form: NgForm){
    this._authService.registrarUsuario(this?.user).subscribe(user => {
      console.log(user);
      this.messageService.add({severity:'success', summary:'Exelente', detail:'Operación realizada con éxito, el usuario fue registrado', life: 1500});
    }, (error) => {
      console.log(error);
      if(error.errors === `Username is already taken.`){
        this.messageService.add({severity:'error', summary: 'Error', detail: 'El userName ya esta en uso.'});
      }else{
        this.messageService.add({severity:'error', summary: 'Error', detail: 'El usuario no se registro.'});
      }
    })
  }

}
