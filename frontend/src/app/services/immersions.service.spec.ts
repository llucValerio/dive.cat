import { TestBed } from '@angular/core/testing';

import { ImmersionsService } from './immersions.service';

describe('ImmersionsService', () => {
  let service: ImmersionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImmersionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
