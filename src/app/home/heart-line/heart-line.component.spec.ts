import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeartLineComponent } from './heart-line.component';

describe('HeartLineComponent', () => {
  let component: HeartLineComponent;
  let fixture: ComponentFixture<HeartLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeartLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeartLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
