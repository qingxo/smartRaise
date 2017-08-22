import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealLineComponent } from './real-line.component';

describe('RealLineComponent', () => {
  let component: RealLineComponent;
  let fixture: ComponentFixture<RealLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
