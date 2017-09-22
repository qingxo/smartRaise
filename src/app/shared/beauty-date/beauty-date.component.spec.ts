import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeautyDateComponent } from './beauty-date.component';

describe('BeautyDateComponent', () => {
  let component: BeautyDateComponent;
  let fixture: ComponentFixture<BeautyDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeautyDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeautyDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
