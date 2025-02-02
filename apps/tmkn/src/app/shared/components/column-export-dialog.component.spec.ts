import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColumnExportDialogComponent } from './column-export-dialog.component';

describe('ColumnExportDialogComponent', () => {
  let component: ColumnExportDialogComponent;
  let fixture: ComponentFixture<ColumnExportDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColumnExportDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ColumnExportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
