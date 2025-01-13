import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TmEmptyDataComponent } from './tm-empty-data.component';

describe('TmEmptyDataComponent', () => {
  let component: TmEmptyDataComponent;
  let fixture: ComponentFixture<TmEmptyDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TmEmptyDataComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TmEmptyDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
