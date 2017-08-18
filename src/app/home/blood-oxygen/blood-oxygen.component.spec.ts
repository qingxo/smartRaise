import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodOxygenComponent } from './blood-oxygen.component';

describe('BloodOxygenComponent', () => {
  let component: BloodOxygenComponent;
  let fixture: ComponentFixture<BloodOxygenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodOxygenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodOxygenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
