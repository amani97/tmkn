import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatFormFieldModule,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatDateFormats,
} from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import {
  DayjsDateAdapter,
  MAT_DAYJS_DATE_ADAPTER_OPTIONS,
} from './adapters/dayjs-date.adapter';
import { MatButtonModule } from '@angular/material/button';
import {
  FGsValidatorButtonDirective,
  TmUiFormErrorMessagesComponent,
  TmUiValidatorCustomElementDirective,
  TmUiValidatorFormEventsListenerDirective,
} from './directives';
import { TM_FORM_ERRORS } from './models/tokens';
import { DynamicFormService } from './services/dynamic-form.service';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { NgxEditorModule } from 'ngx-editor';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { TmEditorComponent } from './components/ngx-editor/ngx-editor.component';
import { TmUploadFileComponent } from './components/upload-file/upload-file.component';

const DEFAULT_TM_MAT_FORM_STYLES: MatFormFieldDefaultOptions = {
  appearance: 'outline',
  color: 'primary',
  hideRequiredMarker: false,
  floatLabel: 'auto',
};

export const DAYJS_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'MM/DD/YYYY',
  },
  display: {
    dateInput: 'MM/DD/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

const DATEPICKER_CONFIG: Provider[] = [
  {
    provide: DateAdapter,
    useClass: DayjsDateAdapter,
    deps: [MAT_DATE_LOCALE, MAT_DAYJS_DATE_ADAPTER_OPTIONS],
  },
  { provide: MAT_DATE_FORMATS, useValue: DAYJS_DATE_FORMATS },
];
@NgModule({
  declarations: [
    TmUiFormErrorMessagesComponent,
    TmUiValidatorCustomElementDirective,
    TmUiValidatorFormEventsListenerDirective,
    FGsValidatorButtonDirective,
    DynamicFormComponent,
    TmEditorComponent,
    TmUploadFileComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatRadioModule,
    FormsModule,
    MatButtonModule,
    NgxEditorModule,
    MatCheckboxModule,
    NgxDropzoneModule,
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,

    DynamicFormComponent,
    TmEditorComponent,
    TmUploadFileComponent,
    // Directives
    TmUiFormErrorMessagesComponent,
    TmUiValidatorCustomElementDirective,
    TmUiValidatorFormEventsListenerDirective,
    FGsValidatorButtonDirective,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: DEFAULT_TM_MAT_FORM_STYLES,
    },
    DATEPICKER_CONFIG,
    DynamicFormService,
  ],
})
export class TmFormFieldModule {
  /**
   * Custom Error Message
   * @param TM_FORM_ERRORS Inject Custom Error Message
   */
  static forRoot(
    errorMessage: unknown
  ): ModuleWithProviders<TmFormFieldModule> {
    return {
      ngModule: TmFormFieldModule,
      providers: [
        {
          provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
          useValue: DEFAULT_TM_MAT_FORM_STYLES,
        },
        { provide: TM_FORM_ERRORS, useValue: errorMessage },
        DATEPICKER_CONFIG,
      ],
    };
  }
}
