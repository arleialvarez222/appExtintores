import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/Operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardsGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router){}

  canActivate(): Observable<boolean>{

    return this.authService.isLogged.pipe(
      take(1),
      map((isLogged: boolean) => !isLogged)

      )

  }

}
