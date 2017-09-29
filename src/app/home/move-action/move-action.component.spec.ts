import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveActionComponent } from './move-action.component';

describe('MoveActionComponent', () => {
  let component: MoveActionComponent;
  let fixture: ComponentFixture<MoveActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
