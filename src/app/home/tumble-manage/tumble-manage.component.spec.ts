import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TumbleManageComponent } from './tumble-manage.component';

describe('TumbleManageComponent', () => {
  let component: TumbleManageComponent;
  let fixture: ComponentFixture<TumbleManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TumbleManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TumbleManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
