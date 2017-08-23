import { TestBed, inject } from '@angular/core/testing';

import { MonitorListService } from './monitor-list.service';

describe('MonitorListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MonitorListService]
    });
  });

  it('should be created', inject([MonitorListService], (service: MonitorListService) => {
    expect(service).toBeTruthy();
  }));
});
