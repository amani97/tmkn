import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CalendarModule } from 'primeng/calendar';
import { materialModule } from './material.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CustomPaginationModule } from './custom-pagination/custom-pagination.module';
import { LightgalleryModule } from 'lightgallery/angular';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxEditorModule } from 'ngx-editor';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ToastModule } from 'primeng/toast';
import { LightboxModule } from 'ngx-lightbox';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { TooltipContentModule } from '../feature-module/common/tooltip-content/tooltip-content.module';
import { BsDaterangepickerConfig } from 'ngx-bootstrap/datepicker';
import { DateRangePickerModule } from '../feature-module/common/date-range-picker/date-range-picker.module';
import { PagechangeModule } from './pagechange/pagechange.module';
import { ChipModule } from 'primeng/chip';
import { DropdownModule } from 'primeng/dropdown';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CountUpModule } from 'ngx-countup';
import { MultiSelectModule } from 'primeng/multiselect';
import { NgCircleProgressModule } from 'ng-circle-progress';

import {
  BsDatepickerModule,
  BsDatepickerConfig,
} from 'ngx-bootstrap/datepicker';
import {
  ButtonNavigatorComponent,
  MainHeaderTitleComponent,
  SectionComponent,
  TmDialogModule,
  TmFormFieldModule,
  TmIconModule,
  TmTableComponent,
  TmTreeTableComponent,
} from '@tmkn/ui';
import { TM_FORM_CUSTOM_ERROR } from './config/form-errors';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    CalendarModule,
    NgApexchartsModule,
    materialModule,
    CustomPaginationModule,
    LightgalleryModule,
    NgScrollbarModule,
    NgxDropzoneModule,
    NgxEditorModule,
    TooltipModule,
    ToastModule,
    LightboxModule,
    NgScrollbarModule,
    PopoverModule,
    NgxMaskDirective,
    NgxMaskPipe,
    TooltipContentModule,
    DateRangePickerModule,
    PagechangeModule,
    ChipModule,
    DropdownModule,
    BsDatepickerModule,
    TimepickerModule.forRoot(),
    FullCalendarModule,
    NgApexchartsModule,
    CountUpModule,
    MultiSelectModule,
    NgCircleProgressModule,
    TmFormFieldModule.forRoot(TM_FORM_CUSTOM_ERROR),
    TmTableComponent,
    MainHeaderTitleComponent,
    MatButtonModule,
    SectionComponent,
    MatTabsModule,
    ButtonNavigatorComponent,
    TmDialogModule,
    TmIconModule,
    MatDatepickerModule,
    MatMenuModule,
    TmTreeTableComponent,
    MatListModule,
    MatRadioModule,
    TooltipContentModule,
    MatSlideToggleModule,
    MatCheckboxModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    CalendarModule,
    NgApexchartsModule,
    materialModule,
    CustomPaginationModule,
    LightgalleryModule,
    NgScrollbarModule,
    NgxDropzoneModule,
    NgxEditorModule,
    TooltipModule,
    ToastModule,
    LightboxModule,
    NgScrollbarModule,
    PopoverModule,
    NgxMaskDirective,
    NgxMaskPipe,
    TooltipContentModule,
    DateRangePickerModule,
    PagechangeModule,
    ChipModule,
    DropdownModule,
    BsDatepickerModule,
    TimepickerModule,
    FullCalendarModule,
    NgApexchartsModule,
    CountUpModule,
    MultiSelectModule,
    NgCircleProgressModule,
    TmFormFieldModule,
    TmTableComponent,
    MainHeaderTitleComponent,
    MatButtonModule,
    SectionComponent,
    MatTabsModule,
    ButtonNavigatorComponent,
    TmDialogModule,
    TmIconModule,
    MatDatepickerModule,
    MatMenuModule,
    TmTreeTableComponent,
    MatListModule,
    MatRadioModule,
    TooltipContentModule,
    MatSlideToggleModule,
    MatCheckboxModule,
  ],
  providers: [
    provideNgxMask(),
    BsDatepickerConfig,
    DatePipe,
    BsDaterangepickerConfig,
  ],
})
export class SharedModule {}
