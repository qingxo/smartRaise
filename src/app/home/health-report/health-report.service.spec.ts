import { TestBed, inject } from '@angular/core/testing';

import { HealthReportService } from './health-report.service';

describe('HealthReportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HealthReportService]
    });
  });

  it('should be created', inject([HealthReportService], (service: HealthReportService) => {
    expect(service).toBeTruthy();
  }));
});
