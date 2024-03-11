import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  // constructor() {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // if (req.url.includes(`${environment.url}/users/1`)) {
    //   const idToken = localStorage.getItem('id_token');
    //   if (idToken) {
    //     const cloned = req.clone({
    //       headers: req.headers.set('Authorization', 'Bearer ' + idToken),
    //     });
    //     return next.handle(cloned);
    //   }
    // }
    // return next.handle(req);

    // const idToken = localStorage.getItem('id_token');
    // if (idToken) {
    //   const cloned = req.clone({
    //     headers: req.headers.set('Authorization', 'Bearer ' + idToken),
    //   });

    //   return next.handle(cloned);
    // } else {
    //   return next.handle(req);
    // }

    return next.handle(req);
  }
}
