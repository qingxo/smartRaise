import { TestBed, inject } from '@angular/core/testing';

import { SleepMonitorService } from './sleep-monitor.service';

describe('SleepMonitorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SleepMonitorService]
    });
  });

  it('should be created', inject([SleepMonitorService], (service: SleepMonitorService) => {
    expect(service).toBeTruthy();
  }));
});
