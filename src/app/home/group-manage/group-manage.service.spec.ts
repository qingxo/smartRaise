import { TestBed, inject } from '@angular/core/testing';

import { GroupManageService } from './group-manage.service';

describe('GroupManageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupManageService]
    });
  });

  it('should be created', inject([GroupManageService], (service: GroupManageService) => {
    expect(service).toBeTruthy();
  }));
});
