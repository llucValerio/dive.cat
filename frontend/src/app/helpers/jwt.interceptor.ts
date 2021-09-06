import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { AuthenticationService } from '../services';
import { User } from '../models';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const currentUser: User = this.authenticationService.currentUserValue;
        // console.log('jwtInterceptor')
        // console.log(currentUser)
        // console.log(currentUser.token)
        // console.log(currentUser.refreshToken)
        const isLoggedIn = currentUser && currentUser.token;
        // console.log('****************** isLogedIn ******************')
        // console.log('isLogedIn:  ' + isLoggedIn)
        // console.log('****************** isLogedIn ******************')
        // const isApiUrl = request.url.startsWith(environment.apiUrl);
        const isApiUrl = request.url.startsWith('/dive');
        // console.log('************ token ****************')
        // console.log(currentUser.token)
        // console.log(currentUser.refreshToken)
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }

        return next.handle(request);
    }
}