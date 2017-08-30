import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarLinesComponent } from './bar-lines.component';

describe('BarLinesComponent', () => {
  let component: BarLinesComponent;
  let fixture: ComponentFixture<BarLinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarLinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
