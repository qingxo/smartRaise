import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignManageComponent } from './sign-manage.component';

describe('SignManageComponent', () => {
  let component: SignManageComponent;
  let fixture: ComponentFixture<SignManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
