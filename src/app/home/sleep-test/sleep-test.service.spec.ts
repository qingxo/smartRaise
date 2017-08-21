import { TestBed, inject } from '@angular/core/testing';

import { SleepTestService } from './sleep-test.service';

describe('SleepTestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SleepTestService]
    });
  });

  it('should be created', inject([SleepTestService], (service: SleepTestService) => {
    expect(service).toBeTruthy();
  }));
});
