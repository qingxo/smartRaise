import { TestBed, inject } from '@angular/core/testing';

import { RecordDetailService } from './record-detail.service';

describe('RecordDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecordDetailService]
    });
  });

  it('should be created', inject([RecordDetailService], (service: RecordDetailService) => {
    expect(service).toBeTruthy();
  }));
});
