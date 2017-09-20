import { TestBed, inject } from '@angular/core/testing';

import { TumbleManageService } from './tumble-manage.service';

describe('TumbleManageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TumbleManageService]
    });
  });

  it('should be created', inject([TumbleManageService], (service: TumbleManageService) => {
    expect(service).toBeTruthy();
  }));
});
