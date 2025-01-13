import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainHeaderTitleComponent } from './main-header-title.component';

describe('MainHeaderTitleComponent', () => {
  let component: MainHeaderTitleComponent;
  let fixture: ComponentFixture<MainHeaderTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainHeaderTitleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MainHeaderTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
