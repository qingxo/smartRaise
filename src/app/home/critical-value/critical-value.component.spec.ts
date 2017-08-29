import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriticalValueComponent } from './critical-value.component';

describe('CriticalValueComponent', () => {
  let component: CriticalValueComponent;
  let fixture: ComponentFixture<CriticalValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriticalValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriticalValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
