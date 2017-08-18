import { TestBed, inject } from '@angular/core/testing';

import { BloodSugarService } from './blood-sugar.service';

describe('BloodSugarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BloodSugarService]
    });
  });

  it('should be created', inject([BloodSugarService], (service: BloodSugarService) => {
    expect(service).toBeTruthy();
  }));
});
