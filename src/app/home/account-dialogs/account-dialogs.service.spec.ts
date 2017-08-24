import { TestBed, inject } from '@angular/core/testing';

import { AccountDialogsService } from './account-dialogs.service';

describe('AccountDialogsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountDialogsService]
    });
  });

  it('should be created', inject([AccountDialogsService], (service: AccountDialogsService) => {
    expect(service).toBeTruthy();
  }));
});
