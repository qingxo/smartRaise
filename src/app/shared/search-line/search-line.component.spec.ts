import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchLineComponent } from './search-line.component';

describe('SearchLineComponent', () => {
  let component: SearchLineComponent;
  let fixture: ComponentFixture<SearchLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
