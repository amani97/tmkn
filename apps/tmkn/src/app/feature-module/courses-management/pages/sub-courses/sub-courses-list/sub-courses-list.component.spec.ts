import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCoursesListComponent } from './sub-courses-list.component';

describe('SubCoursesListComponent', () => {
  let component: SubCoursesListComponent;
  let fixture: ComponentFixture<SubCoursesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubCoursesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubCoursesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
