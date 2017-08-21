import { TestBed, inject } from '@angular/core/testing';

import { TaskInfoService } from './task-info.service';

describe('TaskInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskInfoService]
    });
  });

  it('should be created', inject([TaskInfoService], (service: TaskInfoService) => {
    expect(service).toBeTruthy();
  }));
});
