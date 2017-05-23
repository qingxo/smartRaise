import { TestBed, inject } from '@angular/core/testing';

import { MyTaskService } from './my-task.service';

describe('MyTaskService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyTaskService]
    });
  });

  it('should ...', inject([MyTaskService], (service: MyTaskService) => {
    expect(service).toBeTruthy();
  }));
});
