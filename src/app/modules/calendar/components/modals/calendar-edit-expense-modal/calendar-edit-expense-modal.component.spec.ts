import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarEditExpenseModalComponent } from './calendar-edit-expense-modal.component';

describe('CalendarEditExpenseModalComponent', () => {
  let component: CalendarEditExpenseModalComponent;
  let fixture: ComponentFixture<CalendarEditExpenseModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarEditExpenseModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarEditExpenseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
