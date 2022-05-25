import { TestBed } from '@angular/core/testing';

import { HttpcallsserviceService } from './httpcallsservice.service';

describe('HttpcallsserviceService', () => {
  let service: HttpcallsserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpcallsserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
