import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperNoteFormDialogComponent } from './paper-note-form-dialog.component';

describe('PaperNoteFormDialogComponent', () => {
  let component: PaperNoteFormDialogComponent;
  let fixture: ComponentFixture<PaperNoteFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaperNoteFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaperNoteFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
