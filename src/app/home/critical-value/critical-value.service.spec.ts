import { TestBed, inject } from '@angular/core/testing';

import { CriticalValueService } from './critical-value.service';

describe('CriticalValueService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CriticalValueService]
    });
  });

  it('should be created', inject([CriticalValueService], (service: CriticalValueService) => {
    expect(service).toBeTruthy();
  }));
});
