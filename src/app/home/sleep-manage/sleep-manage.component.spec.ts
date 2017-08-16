import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SleepManageComponent } from './sleep-manage.component';

describe('SleepManageComponent', () => {
  let component: SleepManageComponent;
  let fixture: ComponentFixture<SleepManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SleepManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SleepManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
