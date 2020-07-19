import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarEditEntryModalComponent } from './calendar-edit-entry-modal.component';

describe('CalendarEditEntryModalComponent', () => {
  let component: CalendarEditEntryModalComponent;
  let fixture: ComponentFixture<CalendarEditEntryModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarEditEntryModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarEditEntryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
