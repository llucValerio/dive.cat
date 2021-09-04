import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  registerUser(userData: Object): Observable<Object> {
    return this.httpClient.post<Object>('auth/register', userData)
  }

  loginUser(user: Object): Observable<Object> {
    return this.httpClient.post<Object>('auth/login', user)
  }
  
  fetchUsers(): Observable<Object> {
    // return this.httpClient.get<any[]>(environment.pokeUrl)
    // return this.httpClient.get<any[]>('https://pokeapi.co/api/v2/pokemon/')
    // return this.httpClient.get<any[]>('http://localhost:5015/')
    return this.httpClient.post<Object>('/auth/login',{email:'asdadas', password:'sadad'});
  }
}
