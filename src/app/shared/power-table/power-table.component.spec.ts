import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerTableComponent } from './power-table.component';

describe('PowerTableComponent', () => {
  let component: PowerTableComponent;
  let fixture: ComponentFixture<PowerTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PowerTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
