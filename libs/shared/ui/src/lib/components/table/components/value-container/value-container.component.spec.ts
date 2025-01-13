import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueContainerComponent } from './value-container.component';

describe('ValueContainerComponent', () => {
  let component: ValueContainerComponent;
  let fixture: ComponentFixture<ValueContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValueContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValueContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
