import { TestBed, inject } from '@angular/core/testing';

import { ShoesMapService } from './shoes-map.service';

describe('ShoesMapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShoesMapService]
    });
  });

  it('should be created', inject([ShoesMapService], (service: ShoesMapService) => {
    expect(service).toBeTruthy();
  }));
});
