import { TestBed, inject } from '@angular/core/testing';

import { BloodPressureService } from './blood-pressure.service';

describe('BloodPressureService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BloodPressureService]
    });
  });

  it('should be created', inject([BloodPressureService], (service: BloodPressureService) => {
    expect(service).toBeTruthy();
  }));
});
