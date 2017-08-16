import { TestBed, inject } from '@angular/core/testing';

import { JurisdictionService } from './jurisdiction.service';

describe('JurisdictionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JurisdictionService]
    });
  });

  it('should be created', inject([JurisdictionService], (service: JurisdictionService) => {
    expect(service).toBeTruthy();
  }));
});
