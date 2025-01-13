import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TmIconComponent } from '../tm-icon.component';

describe('TmIconComponent', () => {
  let component: TmIconComponent;
  let fixture: ComponentFixture<TmIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TmIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TmIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
