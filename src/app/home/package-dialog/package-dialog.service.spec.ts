import { TestBed, inject } from '@angular/core/testing';

import { PackageDialogService } from './package-dialog.service';

describe('PackageDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PackageDialogService]
    });
  });

  it('should be created', inject([PackageDialogService], (service: PackageDialogService) => {
    expect(service).toBeTruthy();
  }));
});
