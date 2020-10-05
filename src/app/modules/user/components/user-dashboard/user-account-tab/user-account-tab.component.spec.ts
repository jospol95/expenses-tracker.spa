import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccountTabComponent } from './user-account-tab.component';

describe('UserAccountTabComponent', () => {
  let component: UserAccountTabComponent;
  let fixture: ComponentFixture<UserAccountTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAccountTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAccountTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
