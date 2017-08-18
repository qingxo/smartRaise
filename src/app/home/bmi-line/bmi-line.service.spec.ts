import { TestBed, inject } from '@angular/core/testing';

import { BmiLineService } from './bmi-line.service';

describe('BmiLineService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BmiLineService]
    });
  });

  it('should be created', inject([BmiLineService], (service: BmiLineService) => {
    expect(service).toBeTruthy();
  }));
});
