import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PkginfoDialogComponent } from './pkginfo-dialog.component';

describe('PkginfoDialogComponent', () => {
  let component: PkginfoDialogComponent;
  let fixture: ComponentFixture<PkginfoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PkginfoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PkginfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
