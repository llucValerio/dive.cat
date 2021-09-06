import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

import {environment} from '../../environments/environment'
import {User} from '../models'

@Injectable({ providedIn: 'root' })

export class UserService {
  
  constructor(
    private httpClient: HttpClient
    ) { }

    getAll() {
      return this.httpClient.get<User>(`/dive/user?email=lluc.valerio@gmail.com`);
  }
}
