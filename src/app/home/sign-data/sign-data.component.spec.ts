import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignDataComponent } from './sign-data.component';

describe('SignDataComponent', () => {
  let component: SignDataComponent;
  let fixture: ComponentFixture<SignDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
