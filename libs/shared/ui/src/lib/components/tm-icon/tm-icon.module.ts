import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TmIconComponent } from './components/tm-icon/tm-icon.component';
import { MatIconModule } from '@angular/material/icon';
import { TmIconColorDirective } from './directives/tm-icon-color.directive';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { TablerIconComponent } from './components/tabler-icon/tabler-icon.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [TmIconComponent, TmIconColorDirective, TablerIconComponent],
  imports: [CommonModule, MatIconModule, MatTooltipModule],
  exports: [TmIconComponent, MatIconModule, TablerIconComponent],
})
export class TmIconModule {
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    // TODO: Add Icons URLs & Names When Imports them
    // this.matIconRegistry
    //   .addSvgIcon('add', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/add.svg'))
    //   ;
  }
}
