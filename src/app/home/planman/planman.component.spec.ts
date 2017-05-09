import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanmanComponent } from './planman.component';

describe('PlanmanComponent', () => {
  let component: PlanmanComponent;
  let fixture: ComponentFixture<PlanmanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanmanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
