import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomPaginationComponent } from './custom-pagination.component';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, CustomPaginationComponent],
    exports: [CustomPaginationComponent],
})
export class CustomPaginationModule {}
