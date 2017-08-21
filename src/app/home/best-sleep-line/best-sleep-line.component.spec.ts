import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestSleepLineComponent } from './best-sleep-line.component';

describe('BestSleepLineComponent', () => {
  let component: BestSleepLineComponent;
  let fixture: ComponentFixture<BestSleepLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestSleepLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestSleepLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
