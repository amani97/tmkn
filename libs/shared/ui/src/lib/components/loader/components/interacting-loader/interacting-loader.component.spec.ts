import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractingLoaderComponent } from './interacting-loader.component';

describe('InteractingLoaderComponent', () => {
  let component: InteractingLoaderComponent;
  let fixture: ComponentFixture<InteractingLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteractingLoaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteractingLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
