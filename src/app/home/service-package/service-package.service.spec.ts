import { TestBed, inject } from '@angular/core/testing';

import { ServicePackageService } from './service-package.service';

describe('ServicePackageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServicePackageService]
    });
  });

  it('should ...', inject([ServicePackageService], (service: ServicePackageService) => {
    expect(service).toBeTruthy();
  }));
});
