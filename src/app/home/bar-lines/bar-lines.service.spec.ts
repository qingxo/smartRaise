import { TestBed, inject } from '@angular/core/testing';

import { BarLinesService } from './bar-lines.service';

describe('BarLinesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BarLinesService]
    });
  });

  it('should be created', inject([BarLinesService], (service: BarLinesService) => {
    expect(service).toBeTruthy();
  }));
});
