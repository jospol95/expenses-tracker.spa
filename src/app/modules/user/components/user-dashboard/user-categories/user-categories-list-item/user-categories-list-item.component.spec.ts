import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCategoriesListItemComponent } from './user-categories-list-item.component';

describe('UserCategoriesListItemComponent', () => {
  let component: UserCategoriesListItemComponent;
  let fixture: ComponentFixture<UserCategoriesListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCategoriesListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCategoriesListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
