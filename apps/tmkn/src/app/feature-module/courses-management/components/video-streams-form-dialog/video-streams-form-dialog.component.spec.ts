import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoStreamsFormDialogComponent } from './video-streams-form-dialog.component';

describe('VideoStreamsFormDialogComponent', () => {
  let component: VideoStreamsFormDialogComponent;
  let fixture: ComponentFixture<VideoStreamsFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideoStreamsFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoStreamsFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
