import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BedAnalysisComponent } from './bed-analysis.component';

describe('BedAnalysisComponent', () => {
  let component: BedAnalysisComponent;
  let fixture: ComponentFixture<BedAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BedAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BedAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
