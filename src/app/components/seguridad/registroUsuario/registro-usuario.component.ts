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

  public user = new RegistroModel();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  registrarUsuario(form: NgForm){
    //console.log(form.value);

    this.authService.registrarUsuario(this?.user).subscribe(data => {
      console.log(data);
    }, (error) => {
      console.log(error);
    })
  }

}
