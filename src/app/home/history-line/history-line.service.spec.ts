import { TestBed, inject } from '@angular/core/testing';

import { HistoryLineService } from './history-line.service';

describe('HistoryLineService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HistoryLineService]
    });
  });

  it('should be created', inject([HistoryLineService], (service: HistoryLineService) => {
    expect(service).toBeTruthy();
  }));
});
