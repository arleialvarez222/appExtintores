import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { RegistroModel } from './modelo/registro-model';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css'],
  providers: [HttpClient, MessageService, NgForm ]
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
    if(form.invalid){
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      });
    }else{
      this._authService.registrarUsuario(this?.user).subscribe(usuario => {
        this.messageService.add({severity:'success', summary:'Exelente', detail:'Operación realizada con éxito, el usuario fue registrado', life: 2000});
      }, (error) => {
        //console.log(error.error.errors);
        this.validacionContraseña(error);

      })
    }
  }

  validacionContraseña(error){
    if(error.error.errors == "Passwords must have at least one non alphanumeric character."){
      this.messageService.add({severity:'warn', summary: 'Alérta', detail: 'La contraseña debe contener almenos un símbolo /$-%-#/ .', life: 2000});
    }else if(error.error.errors == "Passwords must have at least one uppercase ('A'-'Z')."){
      this.messageService.add({severity:'warn', summary: 'Alérta', detail: 'La contraseña debe contener una mayuscula / A-Z /.', life: 2000});
    }else if(error.error.errors == "Passwords must be at least 7 characters."){
      this.messageService.add({severity:'warn', summary: 'Alérta', detail: 'La contraseña debe contener almenos 7 carácteres', life: 2000});
    }else if(error.error.errors.ConfirmPassword == "Las contraseñas no coinciden"){
      this.messageService.add({severity:'warn', summary: 'Alérta', detail: 'Las contraseñas no coínciden, revisar que sean iguales.', life: 2000});

    }else if(error.error.errors == `Email ${this.user.email} is already taken.`){
      this.messageService.add({severity:'warn', summary: 'Alérta', detail: 'Este correo ya esta en uso por ootro usuario.', life: 2000});
    }
  }

}
