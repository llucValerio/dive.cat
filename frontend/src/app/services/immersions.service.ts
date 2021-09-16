import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Immersion } from '../models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class ImmersionsService {

  constructor(
    private httpClient: HttpClient
  ) { }
  
  getAllUserImmersions(): Observable<Object> {
    return this.httpClient.get<Immersion>('')
  }

  addImmersion(immersion: Object, userId:string): Observable<Object> {
    return this.httpClient.post<any>(`/dive/immersion?userId=${userId}`, immersion)
  }

}
