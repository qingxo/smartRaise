import { TestBed, inject } from '@angular/core/testing';

import { BedAnalysisService } from './bed-analysis.service';

describe('BedAnalysisService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BedAnalysisService]
    });
  });

  it('should be created', inject([BedAnalysisService], (service: BedAnalysisService) => {
    expect(service).toBeTruthy();
  }));
});
