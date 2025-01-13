import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCourseFormDialogComponent } from './sub-course-form-dialog.component';

describe('SubCourseFormDialogComponent', () => {
  let component: SubCourseFormDialogComponent;
  let fixture: ComponentFixture<SubCourseFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubCourseFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubCourseFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
