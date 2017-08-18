import { TestBed, inject } from '@angular/core/testing';

import { BloodOxygenService } from './blood-oxygen.service';

describe('BloodOxygenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BloodOxygenService]
    });
  });

  it('should be created', inject([BloodOxygenService], (service: BloodOxygenService) => {
    expect(service).toBeTruthy();
  }));
});
