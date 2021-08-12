import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { RegistroModel, LoginModel, UserResponse } from '../components/seguridad/registroUsuario/modelo/registro-model';
import { catchError, map } from 'rxjs/Operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiEndpoint = `${environment.apiUrl}/api`;
  private loggedIn = new BehaviorSubject<boolean>(false);
  private tokenUsuario = new BehaviorSubject<string>(null);

  constructor(private http: HttpClient,
              private router: Router) {
    this.checkToken();
  }

  headers:HttpHeaders = new HttpHeaders({"Content-Type": "application/json"});

  get tokenUsuarioValue(): string {
    return this.tokenUsuario.getValue();
  }

  get isLogged(): Observable<boolean>{
    return this.loggedIn.asObservable();
  }

  registrarUsuario(user: RegistroModel){
    return this.http.post<RegistroModel>(`${this.apiEndpoint}/Usuarios/Registrar`, JSON.stringify(user), {headers: this.headers})
    .pipe(map(data => data));
  }




  loginUsuario(user:LoginModel): Observable<UserResponse>{
    return this.http.post<UserResponse>(`${this.apiEndpoint}/Usuarios/InicioSeccion`, user, {headers: this.headers})
    .pipe(
      map((usuario: UserResponse) => {
        this.saveToken(usuario?.token)
        this.loggedIn.next(true);
        //this.tokenUsuario.next(usuario.token);
        return usuario;
      }),catchError((error) => this.handlerError(error))
    );
  }

  logout(): void{
    localStorage.removeItem("token");
    this.loggedIn.next(false);
    //this.tokenUsuario.next(null);
    this.router.navigate(['/login']);
  }

  private checkToken(): void {
    const userToken = localStorage.getItem("token");
    console.log(userToken)
    const isExpired = helper.isTokenExpired(userToken);
    //this.tokenUsuario.next(usuario.token);
    //console.log('isExired==>', isExpired)
    isExpired ? this.logout :  this.loggedIn.next(true);

  }

  private saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  private handlerError(error): Observable<never>{
    let errorMessage = 'Ocurrio un error';
    if(error){
      errorMessage = `Error: code ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }



}
