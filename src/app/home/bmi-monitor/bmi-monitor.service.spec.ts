import { TestBed, inject } from '@angular/core/testing';

import { BmiMonitorService } from './bmi-monitor.service';

describe('BmiMonitorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BmiMonitorService]
    });
  });

  it('should be created', inject([BmiMonitorService], (service: BmiMonitorService) => {
    expect(service).toBeTruthy();
  }));
});
