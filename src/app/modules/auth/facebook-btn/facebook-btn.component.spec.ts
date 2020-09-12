import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookBtnComponent } from './facebook-btn.component';

describe('FacebookBtnComponent', () => {
  let component: FacebookBtnComponent;
  let fixture: ComponentFixture<FacebookBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacebookBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacebookBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
