import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesManagementContainerComponent } from './courses-management-container.component';

describe('CoursesManagementContainerComponent', () => {
  let component: CoursesManagementContainerComponent;
  let fixture: ComponentFixture<CoursesManagementContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoursesManagementContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesManagementContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
