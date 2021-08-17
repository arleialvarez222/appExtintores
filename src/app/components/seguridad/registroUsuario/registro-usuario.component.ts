import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { RegistroModel } from './modelo/registro-model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
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

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
  }

  registrarUsuario(form: NgForm){

    this._authService.registrarUsuario(this?.user).subscribe(data => {
      console.log(data);
    }, (error) => {
      console.log(error);
    })
  }

}
