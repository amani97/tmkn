import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TmPageNotFoundComponent } from './tm-page-not-found.component';

describe('TmPageNotFoundComponent', () => {
  let component: TmPageNotFoundComponent;
  let fixture: ComponentFixture<TmPageNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TmPageNotFoundComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TmPageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
