import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JurisdictionComponent } from './jurisdiction.component';

describe('JurisdictionComponent', () => {
  let component: JurisdictionComponent;
  let fixture: ComponentFixture<JurisdictionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JurisdictionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JurisdictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
