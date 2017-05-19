import { TestBed, inject } from '@angular/core/testing';

import { SmartBedService } from './smart-bed.service';

describe('SmartBedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SmartBedService]
    });
  });

  it('should ...', inject([SmartBedService], (service: SmartBedService) => {
    expect(service).toBeTruthy();
  }));
});
