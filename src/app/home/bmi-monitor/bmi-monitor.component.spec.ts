import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BmiMonitorComponent } from './bmi-monitor.component';

describe('BmiMonitorComponent', () => {
  let component: BmiMonitorComponent;
  let fixture: ComponentFixture<BmiMonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BmiMonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BmiMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
