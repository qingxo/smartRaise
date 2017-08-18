import { TestBed, inject } from '@angular/core/testing';

import { HeatLineService } from './heat-line.service';

describe('HeatLineService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeatLineService]
    });
  });

  it('should be created', inject([HeatLineService], (service: HeatLineService) => {
    expect(service).toBeTruthy();
  }));
});
