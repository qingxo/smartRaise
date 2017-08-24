import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDialogsComponent } from './account-dialogs.component';

describe('AccountDialogsComponent', () => {
  let component: AccountDialogsComponent;
  let fixture: ComponentFixture<AccountDialogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountDialogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDialogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
