import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SleepMonitorComponent } from './sleep-monitor.component';

describe('SleepMonitorComponent', () => {
  let component: SleepMonitorComponent;
  let fixture: ComponentFixture<SleepMonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SleepMonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SleepMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
