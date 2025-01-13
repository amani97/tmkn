import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteLoginComponent } from './complete-login.component';

describe('CompleteLoginComponent', () => {
  let component: CompleteLoginComponent;
  let fixture: ComponentFixture<CompleteLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompleteLoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CompleteLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
