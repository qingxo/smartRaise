import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartBedComponent } from './smart-bed.component';

describe('SmartBedComponent', () => {
  let component: SmartBedComponent;
  let fixture: ComponentFixture<SmartBedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartBedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartBedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
