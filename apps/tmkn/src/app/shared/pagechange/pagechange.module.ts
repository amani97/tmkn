import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagechangeRoutingModule } from './pagechange-routing.module';
import { PagechangeComponent } from './pagechange.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
    imports: [
        CommonModule,
        PagechangeRoutingModule,
        FormsModule, ReactiveFormsModule,
        PagechangeComponent
    ],
    exports: [PagechangeComponent],
})
export class PagechangeModule { }
