import { TestBed, inject } from '@angular/core/testing';

import { OrderDetailService } from './order-detail.service';

describe('OrderDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderDetailService]
    });
  });

  it('should ...', inject([OrderDetailService], (service: OrderDetailService) => {
    expect(service).toBeTruthy();
  }));
});
