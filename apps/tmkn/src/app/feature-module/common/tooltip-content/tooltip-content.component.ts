import { Component, Input } from '@angular/core';

import {ExcelExportService} from '../../../shared/services/export.service';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@Component({
  selector: 'app-tooltip-content',
  templateUrl: './tooltip-content.component.html',
  styleUrl: './tooltip-content.component.scss',
  standalone: true,
  imports: [TooltipModule],
})
export class TooltipContentComponent {
  @Input() rowsToExport: any[] = []; // Input for selected rows

  constructor(private excelExportService: ExcelExportService) {}

  exportData() {
    this.excelExportService.exportToExcel(this.rowsToExport, 'EmployeeData');
  }
}
