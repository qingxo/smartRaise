import { TestBed, inject } from '@angular/core/testing';

import { SyncDataService } from './sync-data.service';

describe('SyncDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SyncDataService]
    });
  });

  it('should ...', inject([SyncDataService], (service: SyncDataService) => {
    expect(service).toBeTruthy();
  }));
});
