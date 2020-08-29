import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacadeListItemComponent } from './facade-list-item.component';

describe('FacadeListItemComponent', () => {
  let component: FacadeListItemComponent;
  let fixture: ComponentFixture<FacadeListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacadeListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacadeListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
