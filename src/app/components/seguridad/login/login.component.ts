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
    this.subscripcion.add(
      this.authService.loginUsuario(this?.user).subscribe(resp => {
        this.router.navigate(['gastos']);

        /* if(resp){
          this.router.navigate(['gastos']);
        }else{
          this.router.navigate(['login']);
        } */
      }, (error) => {
        console.log(error);
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Se encontraron problemas con el usuario'});
        this.router.navigate(['login']);
      })
    );
  }

}
