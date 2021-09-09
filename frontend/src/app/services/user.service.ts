import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

import {environment} from '../../environments/environment'
import {User} from '../models'
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class UserService {
  
  constructor(
    private httpClient: HttpClient
    ) { }
    
    getUserByEmail(): Observable<any> {
      return this.httpClient.get<User>(`/dive/user?email=lluc.valerio@gmail.com`);
    }

    getAllUsers(): Observable<any> {
      return this.httpClient.get<User>(`/dive/user`);
    }

    updateUserById(user: object, userId: number): Observable<any> {
      return this.httpClient.put<User>(`/dive/user/${userId}`,user );
    }

  

}
