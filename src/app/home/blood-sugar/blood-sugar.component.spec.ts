import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodSugarComponent } from './blood-sugar.component';

describe('BloodSugarComponent', () => {
  let component: BloodSugarComponent;
  let fixture: ComponentFixture<BloodSugarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodSugarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodSugarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
