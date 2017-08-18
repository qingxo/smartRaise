import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatLineComponent } from './heat-line.component';

describe('HeatLineComponent', () => {
  let component: HeatLineComponent;
  let fixture: ComponentFixture<HeatLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeatLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeatLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
