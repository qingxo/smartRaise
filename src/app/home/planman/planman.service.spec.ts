import { TestBed, inject } from '@angular/core/testing';

import { PlanmanService } from './planman.service';

describe('PlanmanService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlanmanService]
    });
  });

  it('should ...', inject([PlanmanService], (service: PlanmanService) => {
    expect(service).toBeTruthy();
  }));
});
