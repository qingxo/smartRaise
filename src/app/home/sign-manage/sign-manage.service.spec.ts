import { TestBed, inject } from '@angular/core/testing';

import { SignManageService } from './sign-manage.service';

describe('SignManageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SignManageService]
    });
  });

  it('should be created', inject([SignManageService], (service: SignManageService) => {
    expect(service).toBeTruthy();
  }));
});
