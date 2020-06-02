import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMonthSummaryComponent } from './user-month-summary.component';

describe('UserMonthSummaryComponent', () => {
  let component: UserMonthSummaryComponent;
  let fixture: ComponentFixture<UserMonthSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMonthSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMonthSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
