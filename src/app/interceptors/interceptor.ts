import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable()
export class  Interceptor implements HttpInterceptor{

  constructor(){}

  intercept(req:HttpRequest<any>, next: HttpHandler): Observable<any> {

    req =  req.clone({
      setHeaders: {
        "content-type": "application/json",
        'Authorization': "Bearer "+ localStorage.getItem("token"),
      }
    });
    return next.handle(req);
  }
}
