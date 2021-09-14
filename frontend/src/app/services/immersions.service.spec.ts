import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController  } from '@angular/common/http/testing';

import { ImmersionsService } from './immersions.service';

describe('ImmersionsService Service', () => {
  let httpTestingController: HttpTestingController;
  let service: ImmersionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ImmersionsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it ('#getallUserImmersions should use GET to retrieve data',()=>{
    service.getAllUserImmersions().subscribe()
  
    const testRequest = httpTestingController.expectOne('');

    expect(testRequest.request.method).toEqual('GET');
  });
});
