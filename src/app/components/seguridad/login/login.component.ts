import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoginModel } from '../registroUsuario/modelo/registro-model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ MessageService, NgForm ]
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscripcion : Subscription = new Subscription();

  public user: LoginModel = {
    email: 'alvarezarlei222@gmail.com',
    password: 'Baronrojo222$',
    clientURI: 'login usuario',
  }

  constructor(private authService: AuthService,
              private router: Router,
              private messageService: MessageService,) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
  }

  loginUsuario(form: NgForm){
    if(form.invalid){
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      })
    }else{
      this.subscripcion.add(
        this.authService.loginUsuario(this?.user).subscribe(resp => {

          this.router.navigate(['factura']);

        }, (error) => {
          this.validacionContraseña(error);
        })
      );
    }
  }

  validacionContraseña(error){
    if(error?.error == "El usuario no existe."){
      this.messageService.add({severity:'warn', summary: 'Alerta', detail: 'El usuario no existe', life: 2000});

    }else if(error?.error?.mensajeError == "Autentificacion invalida"){
      this.messageService.add({severity:'warn', summary: 'Alerta', detail: 'La contrseña no es correcta', life: 2000});

    }else if(error?.error?.errores == "A connection attempt failed because the connected party did not properly respond after a period of time, or established connection failed because connected host has failed to respond. 65.254.244.176:25"){
      this.messageService.add({severity:'warn', summary: 'Alerta', detail: 'No se obtubo respuesta del servidor, revisa tu conexión', life: 2000});
    }
  }

}
