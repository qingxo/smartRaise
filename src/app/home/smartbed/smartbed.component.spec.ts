import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartbedComponent } from './smartbed.component';

describe('SmartbedComponent', () => {
  let component: SmartbedComponent;
  let fixture: ComponentFixture<SmartbedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartbedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartbedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
