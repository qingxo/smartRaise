import { TestBed, inject } from '@angular/core/testing';

import { PkginfoDialogService } from './pkginfo-dialog.service';

describe('PkginfoDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PkginfoDialogService]
    });
  });

  it('should be created', inject([PkginfoDialogService], (service: PkginfoDialogService) => {
    expect(service).toBeTruthy();
  }));
});
