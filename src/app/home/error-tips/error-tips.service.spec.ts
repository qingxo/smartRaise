import { TestBed, inject } from '@angular/core/testing';

import { ErrorTipsService } from './error-tips.service';

describe('ErrorTipsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorTipsService]
    });
  });

  it('should ...', inject([ErrorTipsService], (service: ErrorTipsService) => {
    expect(service).toBeTruthy();
  }));
});
