import { TestBed, inject } from '@angular/core/testing';

import { SleepQualityService } from './sleep-quality.service';

describe('SleepQualityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SleepQualityService]
    });
  });

  it('should be created', inject([SleepQualityService], (service: SleepQualityService) => {
    expect(service).toBeTruthy();
  }));
});
