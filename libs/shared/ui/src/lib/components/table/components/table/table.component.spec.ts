import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TmTableComponent } from './table.component';

describe('TmTableComponent', () => {
  let component: TmTableComponent<any>;
  let fixture: ComponentFixture<TmTableComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TmTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TmTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
