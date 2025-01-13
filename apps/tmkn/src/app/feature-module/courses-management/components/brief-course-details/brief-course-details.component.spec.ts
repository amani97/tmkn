import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefCourseDetailsComponent } from './brief-course-details.component';

describe('BriefCourseDetailsComponent', () => {
  let component: BriefCourseDetailsComponent;
  let fixture: ComponentFixture<BriefCourseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BriefCourseDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BriefCourseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
