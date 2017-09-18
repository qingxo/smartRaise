import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoesMapComponent } from './shoes-map.component';

describe('ShoesMapComponent', () => {
  let component: ShoesMapComponent;
  let fixture: ComponentFixture<ShoesMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoesMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoesMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
