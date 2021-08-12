/* import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable()
export class  Interceptor implements HttpInterceptor{
  intercept(req:HttpRequest<any>, next: HttpHandler): Observable<any> {
    const authToken = 'xxx';
    const authReq = req.clone({
      setHeaders: {
        auth: authToken,
      }
    });
    return next.handle(authReq);
  }
} */
