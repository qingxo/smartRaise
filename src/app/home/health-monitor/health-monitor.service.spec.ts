import { TestBed, inject } from '@angular/core/testing';

import { HealthMonitorService } from './health-monitor.service';

describe('HealthMonitorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HealthMonitorService]
    });
  });

  it('should be created', inject([HealthMonitorService], (service: HealthMonitorService) => {
    expect(service).toBeTruthy();
  }));
});
