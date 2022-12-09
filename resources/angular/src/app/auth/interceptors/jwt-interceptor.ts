import {Injectable} from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {AuthService} from "../services/auth.service";
import {catchError, map, Observable, throwError} from "rxjs";

@Injectable()
export class JWTInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const token = this.authService.getToken();

    if (token){
      request = request.clone({
        setHeaders: {Authorization: `Bearer ${token}`}
      });
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && event.body.token) {
          console.log('JWTInterceptor event body: ',event.body);
          console.log('JWTInterceptor: event ',event);
          localStorage.setItem('token', event.body.token);
        }
        return event;
      }),
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.authService.removeToken();
          }
        }
        return throwError(err);
      })
    )
  }
}

