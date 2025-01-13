import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseDialogComponent } from './components/base-dialog/base-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { TmConfirmationDialogService } from './services/confirmation-dialog.service';
import { StylingConfirmationDialogDirective } from './directives/styling-confirmation-dialog.directive';

@NgModule({
  declarations: [BaseDialogComponent, ConfirmDialogComponent, StylingConfirmationDialogDirective],
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  exports: [BaseDialogComponent, ConfirmDialogComponent, MatDialogModule],
  providers: [TmConfirmationDialogService],
})
export class TmDialogModule {}
