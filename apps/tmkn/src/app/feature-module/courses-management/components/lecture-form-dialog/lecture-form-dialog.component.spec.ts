import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LectureFormDialogComponent } from './lecture-form-dialog.component';

describe('LectureFormDialogComponent', () => {
  let component: LectureFormDialogComponent;
  let fixture: ComponentFixture<LectureFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LectureFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LectureFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
