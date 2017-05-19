import { TestBed, inject } from '@angular/core/testing';

import { SmartbedService } from './smartbed.service';

describe('SmartbedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SmartbedService]
    });
  });

  it('should ...', inject([SmartbedService], (service: SmartbedService) => {
    expect(service).toBeTruthy();
  }));
});
