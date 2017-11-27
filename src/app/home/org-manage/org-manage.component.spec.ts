import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgManageComponent } from './org-manage.component';

describe('OrgManageComponent', () => {
  let component: OrgManageComponent;
  let fixture: ComponentFixture<OrgManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
