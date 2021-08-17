import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoginModel } from '../registroUsuario/modelo/registro-model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscripcion : Subscription = new Subscription();

  public user: LoginModel = {
    email: 'alvarezarlei222@gmail.com',
    password: 'Baronrojo222$',
    clientURI: 'login usuario',
  }

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
  }

  loginUsuario(form: NgForm){
    this.subscripcion.add(
      this.authService.loginUsuario(this?.user).subscribe(resp => {

        if(resp){
          this.router.navigate(['gastos']);
        }else{
          this.router.navigate(['login']);
        }
      }, (error) => {
        console.log(error);
      })
    );
  }

}
