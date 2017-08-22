import { TestBed, inject } from '@angular/core/testing';

import { RealLineService } from './real-line.service';

describe('RealLineService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RealLineService]
    });
  });

  it('should be created', inject([RealLineService], (service: RealLineService) => {
    expect(service).toBeTruthy();
  }));
});
