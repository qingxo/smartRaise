import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SleepTestComponent } from './sleep-test.component';

describe('SleepTestComponent', () => {
  let component: SleepTestComponent;
  let fixture: ComponentFixture<SleepTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SleepTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SleepTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
