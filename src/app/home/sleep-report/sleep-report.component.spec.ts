import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SleepReportComponent } from './sleep-report.component';

describe('SleepReportComponent', () => {
  let component: SleepReportComponent;
  let fixture: ComponentFixture<SleepReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SleepReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SleepReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
