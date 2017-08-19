import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthMonitorComponent } from './health-monitor.component';

describe('HealthMonitorComponent', () => {
  let component: HealthMonitorComponent;
  let fixture: ComponentFixture<HealthMonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthMonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
