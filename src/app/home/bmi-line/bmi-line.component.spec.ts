import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BmiLineComponent } from './bmi-line.component';

describe('BmiLineComponent', () => {
  let component: BmiLineComponent;
  let fixture: ComponentFixture<BmiLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BmiLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BmiLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
