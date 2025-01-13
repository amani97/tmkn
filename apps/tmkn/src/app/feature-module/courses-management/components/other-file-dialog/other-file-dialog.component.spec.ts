import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherFileFormDialogComponent } from './other-file-dialog.component';

describe('OtherFileFormDialogComponent', () => {
  let component: OtherFileFormDialogComponent;
  let fixture: ComponentFixture<OtherFileFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OtherFileFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherFileFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
