import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TmPaginatorComponent } from './paginator.component';

describe('TmPaginatorComponent', () => {
  let component: TmPaginatorComponent;
  let fixture: ComponentFixture<TmPaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TmPaginatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TmPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
