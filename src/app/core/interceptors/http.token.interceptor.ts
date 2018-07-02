import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

import { JwtService, UserService } from '../services';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  constructor(private router: Router
    , private jwtService: JwtService
    , private userService: UserService
    , private toastr: ToastrService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    const user = this.jwtService.getUser();

    if (user) {
      headersConfig['Authorization'] = `Bearer ${user.token}`;
    }

    const request = req.clone({ setHeaders: headersConfig });
    return next.handle(request)
      .catch((error, source) => {

        if (error instanceof HttpErrorResponse &&
          error.status == 401 && error.statusText.toLowerCase() === 'invalid token'
          && !error.url.includes("/login")) {
          this.toastr.error('Your session has expired and you have been logged out', 'Error', {
            positionClass: 'toast-top-full-width'
          });
          this.userService.purgeAuth();
          this.router.navigateByUrl('/login');
          return;
          //return Observable.empty();
        }
        else {
          return Observable.throw(error);
        }
      });
  }
}