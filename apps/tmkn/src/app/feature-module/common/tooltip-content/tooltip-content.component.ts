import { Component } from '@angular/core';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@Component({
    selector: 'app-tooltip-content',
    templateUrl: './tooltip-content.component.html',
    styleUrl: './tooltip-content.component.scss',
    standalone: true,
    imports: [TooltipModule]
})
export class TooltipContentComponent {

}
