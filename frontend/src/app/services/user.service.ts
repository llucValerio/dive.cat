import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

import {environment} from '../../environments/environment'
import { User } from '../models'
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class UserService {
  
  constructor(
    private httpClient: HttpClient
  ) { }

  getUserByEmail(userEmail: string): Observable<Object> {
    return this.httpClient.get<User>(`/dive/user?email=${userEmail}`);
  }

  getAllUsers(): Observable<Object> {
    return this.httpClient.get<User>(`/dive/user`);
  }

  updateUserById(user: object, userId: number): Observable<Object> {
    return this.httpClient.put<User>(`/dive/user/${userId}`,user );
  }

  registerUser(userRegisterData: Object): Observable<Object> {
    return this.httpClient.post<Object>('auth/register', userRegisterData)
  }
}
