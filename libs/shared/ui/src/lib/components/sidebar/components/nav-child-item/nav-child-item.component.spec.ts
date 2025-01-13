import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavChildItemComponent } from './nav-child-item.component';

describe('NavChildItemComponent', () => {
  let component: NavChildItemComponent;
  let fixture: ComponentFixture<NavChildItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavChildItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavChildItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
