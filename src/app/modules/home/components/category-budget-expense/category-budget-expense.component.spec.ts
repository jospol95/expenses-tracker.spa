import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryBudgetExpenseComponent } from './category-budget-expense.component';

describe('CategoryBudgetExpenseComponent', () => {
  let component: CategoryBudgetExpenseComponent;
  let fixture: ComponentFixture<CategoryBudgetExpenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryBudgetExpenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryBudgetExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
