import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController  } from '@angular/common/http/testing';

import { User } from '../models'
import { UserService } from './user.service';
import { of } from 'rxjs';

describe('UserService Service', () => {
  let httpTestingController: HttpTestingController;
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        {provide: User,
          useValue: {name: 'Luke'}}
      ]
    });
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it ('#getUserByEmail should use GET to retrieve data',()=>{
    service.getUserByEmail('email').subscribe()

    const testRequest = httpTestingController.expectOne('/dive/user?email=email');

    expect(testRequest.request.method).toEqual('GET');
  });

  it ('#getAllUsers should use GET to retrieve data',()=>{
    service.getAllUsers().subscribe()

    const testRequest = httpTestingController.expectOne('/dive/user');

    expect(testRequest.request.method).toEqual('GET');
  });

  it ('#updateUserById should use PUT to retrieve data',()=>{
    service.updateUserById({},1).subscribe()

    const testRequest = httpTestingController.expectOne('/dive/user/1');

    expect(testRequest.request.method).toEqual('PUT');
  });

  it ('#registerUser should use POST to retrieve data',()=>{
    service.registerUser({}).subscribe()

    const testRequest = httpTestingController.expectOne('auth/register');

    expect(testRequest.request.method).toEqual('POST');
  });
});
