import { Injectable } from '@angular/core';
import { ColumnStylesOptions, StyleClassName } from '../models/table-column.model';

@Injectable()
export class ColumnStyleOptionsService {
  setStyleClasses(styleOptions?: ColumnStylesOptions) {
    let classes = 'tm-value-container';
    if (styleOptions) {
      if (styleOptions?.isBold) {
        classes = this._appendWithSpace(classes, StyleClassName.Bold);
      }
      if (styleOptions?.isStatus) {
        classes = this._appendWithSpace(classes, StyleClassName.Status);
        if (styleOptions?.status?.color) {
          classes = this._appendWithSpace(classes, `tm-${styleOptions?.status?.color}`);
        }
      }
    }
    return classes;
  }

  private _appendWithSpace(baseVale: string, appendedValue: StyleClassName | string) {
    if (baseVale) {
      return baseVale?.concat(' ', appendedValue);
    } else {
      return appendedValue;
    }
  }
}
