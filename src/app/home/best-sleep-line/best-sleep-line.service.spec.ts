import { TestBed, inject } from '@angular/core/testing';

import { BestSleepLineService } from './best-sleep-line.service';

describe('BestSleepLineService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BestSleepLineService]
    });
  });

  it('should be created', inject([BestSleepLineService], (service: BestSleepLineService) => {
    expect(service).toBeTruthy();
  }));
});
