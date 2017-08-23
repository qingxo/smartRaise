import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SleepQualityComponent } from './sleep-quality.component';

describe('SleepQualityComponent', () => {
  let component: SleepQualityComponent;
  let fixture: ComponentFixture<SleepQualityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SleepQualityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SleepQualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
