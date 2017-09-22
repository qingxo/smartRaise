import { TestBed, inject } from '@angular/core/testing';

import { SleepReportService } from './sleep-report.service';

describe('SleepReportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SleepReportService]
    });
  });

  it('should be created', inject([SleepReportService], (service: SleepReportService) => {
    expect(service).toBeTruthy();
  }));
});
