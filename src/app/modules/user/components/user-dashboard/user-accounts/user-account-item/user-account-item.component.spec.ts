import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccountItemComponent } from './user-account-item.component';

describe('UserAccountItemComponent', () => {
  let component: UserAccountItemComponent;
  let fixture: ComponentFixture<UserAccountItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAccountItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAccountItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
