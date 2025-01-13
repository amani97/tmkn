import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipContentComponent } from './tooltip-content.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
    imports: [CommonModule, TooltipModule, TooltipContentComponent],
    exports: [TooltipContentComponent],
})
export class TooltipContentModule {}
