import { TestBed, inject } from '@angular/core/testing';

import { MeasureDetailService } from './measure-detail.service';

describe('MeasureDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MeasureDetailService]
    });
  });

  it('should be created', inject([MeasureDetailService], (service: MeasureDetailService) => {
    expect(service).toBeTruthy();
  }));
});
