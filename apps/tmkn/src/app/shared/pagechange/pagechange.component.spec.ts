import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagechangeComponent } from './pagechange.component';

describe('PagechangeComponent', () => {
  let component: PagechangeComponent;
  let fixture: ComponentFixture<PagechangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [PagechangeComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(PagechangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
