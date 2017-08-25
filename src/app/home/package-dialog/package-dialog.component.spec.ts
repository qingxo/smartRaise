import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageDialogComponent } from './package-dialog.component';

describe('PackageDialogComponent', () => {
  let component: PackageDialogComponent;
  let fixture: ComponentFixture<PackageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
