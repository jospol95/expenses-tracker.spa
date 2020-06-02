import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarNumberComponent } from './calendar-number.component';

describe('CalendarNumberComponent', () => {
  let component: CalendarNumberComponent;
  let fixture: ComponentFixture<CalendarNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
