import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineBtnComponent } from './line-btn.component';

describe('LineBtnComponent', () => {
  let component: LineBtnComponent;
  let fixture: ComponentFixture<LineBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
