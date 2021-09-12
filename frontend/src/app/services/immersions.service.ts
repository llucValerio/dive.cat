import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Immersion } from '../models';

@Injectable({ providedIn: 'root' })

export class ImmersionsService {

  constructor(
    private httpClient: HttpClient
  ) { }
  
  getAllUserImmersions() {
    return this.httpClient.get<Immersion>('')
  }

}
