import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynDataComponent } from './syn-data.component';

describe('SynDataComponent', () => {
  let component: SynDataComponent;
  let fixture: ComponentFixture<SynDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SynDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
