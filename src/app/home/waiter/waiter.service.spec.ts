import { TestBed, inject } from '@angular/core/testing';

import { WaiterService } from './waiter.service';

describe('WaiterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WaiterService]
    });
  });

  it('should ...', inject([WaiterService], (service: WaiterService) => {
    expect(service).toBeTruthy();
  }));
});
