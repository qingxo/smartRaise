import { TestBed, inject } from '@angular/core/testing';

import { SignDataService } from './sign-data.service';

describe('SignDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SignDataService]
    });
  });

  it('should be created', inject([SignDataService], (service: SignDataService) => {
    expect(service).toBeTruthy();
  }));
});
