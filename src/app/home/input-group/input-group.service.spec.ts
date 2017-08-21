import { TestBed, inject } from '@angular/core/testing';

import { InputGroupService } from './input-group.service';

describe('InputGroupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InputGroupService]
    });
  });

  it('should be created', inject([InputGroupService], (service: InputGroupService) => {
    expect(service).toBeTruthy();
  }));
});
