import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { RegistroModel, LoginModel, UserResponse } from '../components/seguridad/registroUsuario/modelo/registro-model';
import { catchError, map } from 'rxjs/Operators';
import { BehaviorSubject, Observable, pipe, throwError } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiEndpoint = `${environment.apiUrl}/api`;
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient,
              private router: Router) {
    this.checkToken();
  }

  get isLogged(): Observable<boolean>{
    return this.loggedIn.asObservable();
  }

  registrarUsuario(user: RegistroModel){
    return this.http.post<RegistroModel>(`${this.apiEndpoint}/Usuarios/Registrar`, user)
      .pipe(map(data => data));
  }

  loginUsuario(user:LoginModel): Observable<UserResponse>{
    return this.http.post<UserResponse>(`${this.apiEndpoint}/Usuarios/InicioSeccion`, user)
    .pipe(
      map((usuario: UserResponse) => {
        this.saveToken(usuario?.token);
        this.loggedIn.next(true);
        return usuario;
      })
    );
  }

  logout(): void{
    localStorage.removeItem("token");
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  private checkToken(): void {
    const userToken = localStorage.getItem("token");
    const isExpired = helper.isTokenExpired(userToken);
    isExpired ? this.logout :  this.loggedIn.next(true);
  }

  private saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  /* private handlerError(error): Observable<never>{
    let errorMessage = 'Ocurrio un error';
    if(error){
      errorMessage = `Error: code ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  } */



}
