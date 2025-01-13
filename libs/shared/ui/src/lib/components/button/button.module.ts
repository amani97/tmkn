import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { ButtonLoadingDirective } from './directives/button-loader.directive';
import { FlatButtonComponent } from './flat-button/flat-button.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ButtonLoadingDirective, FlatButtonComponent],
  imports: [CommonModule, MatButtonModule, RouterModule],
  exports: [ButtonLoadingDirective, FlatButtonComponent, MatButtonModule],
  providers: [MatButton],
})
export class TmButtonModule {}
