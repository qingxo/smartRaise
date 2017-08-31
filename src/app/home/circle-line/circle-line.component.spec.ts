import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleLineComponent } from './circle-line.component';

describe('CircleLineComponent', () => {
  let component: CircleLineComponent;
  let fixture: ComponentFixture<CircleLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CircleLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CircleLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
