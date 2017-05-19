import { TestBed, inject } from '@angular/core/testing';

import { OrderPackageService } from './order-package.service';

describe('OrderPackageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderPackageService]
    });
  });

  it('should ...', inject([OrderPackageService], (service: OrderPackageService) => {
    expect(service).toBeTruthy();
  }));
});
