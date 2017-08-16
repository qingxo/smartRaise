import { TestBed, inject } from '@angular/core/testing';

import { SynDataService } from './syn-data.service';

describe('SynDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SynDataService]
    });
  });

  it('should be created', inject([SynDataService], (service: SynDataService) => {
    expect(service).toBeTruthy();
  }));
});
