import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DynamicFormService } from '../../services/dynamic-form.service';
import { DynamicFormField } from '../../models/dtos/form-field.dto';
import { Editor, Toolbar } from 'ngx-editor';



@Component({
  selector: 'tm-ui-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  standalone: false,
})
export class DynamicFormComponent implements OnInit, OnDestroy {
  @Input() fields: DynamicFormField[] = [];
  singleFile: File[] = [];
  formGroup!: FormGroup;
  editor!: Editor;
  html = '';
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  constructor(private dynamicFormService: DynamicFormService) {}

  ngOnInit(): void {
    this.editor = new Editor();
    this.formGroup = this.dynamicFormService.createForm(this.fields);
  }

  onSingleSelect(event: { addedFiles: File[] }) {
    this.singleFile = [];
    this.singleFile.push(...event.addedFiles);
  }

  onRemoveSingle(event: File) {
    this.singleFile.splice(this.singleFile.indexOf(event), 1);
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      console.log('Form Values:', this.formGroup.value);
    }
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
