import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CookieService } from "ngx-cookie-service";
import { Observable } from 'rxjs';

import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(
    private httpClient: HttpClient,
    private cookies: CookieService
    ) { }

  registerUser(userRegisterData: Object): Observable<Object> {
    console.log('user on loginUser')
    console.log(userRegisterData)
    return this.httpClient.post<Object>('auth/register', userRegisterData)
  }

  loginUser(userLoginData: Object): Observable<Object> {
    console.log('user on loginUser')
    console.log(userLoginData)
    return this.httpClient.post<Object>('auth/login', userLoginData)
  }

  refreshToken(refreshToken: Object): Observable<any> {
    return this.httpClient
    .post('auth/refreshToken', refreshToken) 
    }
    
    setCookieToken(tokens: {token:string, refreshToken:string}): void {
      this.cookies.set("token", tokens.token);
      this.cookies.set("refreshToken", tokens.refreshToken);
    }

    getCookieRefreshToken(): String {
      try {
        return this.cookies.get("refreshToken");
      } catch (error) {
        return `An error occurred reading cookies: ${ error}`;
      }
    }

  fetchUsers(): Observable<Object> {
    // return this.httpClient.get<any[]>(environment.pokeUrl)
    // return this.httpClient.get<any[]>('https://pokeapi.co/api/v2/pokemon/')
    // return this.httpClient.get<any[]>('http://localhost:5015/')
    return this.httpClient.post<Object>('/auth/login',{email:'asdadas', password:'sadad'});
  }
}
