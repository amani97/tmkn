import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonNavigatorComponent } from './button-navigator.component';

describe('ButtonNavigatorComponent', () => {
  let component: ButtonNavigatorComponent;
  let fixture: ComponentFixture<ButtonNavigatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonNavigatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
