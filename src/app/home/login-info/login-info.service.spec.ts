import { TestBed, inject } from '@angular/core/testing';

import { LoginInfoService } from './login-info.service';

describe('LoginInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginInfoService]
    });
  });

  it('should be created', inject([LoginInfoService], (service: LoginInfoService) => {
    expect(service).toBeTruthy();
  }));
});
