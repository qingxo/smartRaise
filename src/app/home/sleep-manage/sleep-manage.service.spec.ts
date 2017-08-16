import { TestBed, inject } from '@angular/core/testing';

import { SleepManageService } from './sleep-manage.service';

describe('SleepManageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SleepManageService]
    });
  });

  it('should be created', inject([SleepManageService], (service: SleepManageService) => {
    expect(service).toBeTruthy();
  }));
});
