import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarDayExpenseComponent } from './calendar-day-expense.component';

describe('CalendarDayExpenseComponent', () => {
  let component: CalendarDayExpenseComponent;
  let fixture: ComponentFixture<CalendarDayExpenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarDayExpenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarDayExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
