import { Component, inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SubCoursesService } from 'apps/tmkn/src/app/feature-module/courses-management/data/sub-courses.service';
import { CourseManagementType } from 'apps/tmkn/src/app/shared/enums/course-management-type.enum';
import { DynamicFormField } from 'libs/shared/ui/src/lib/components/form-field/models/dtos/form-field.dto';
import { SubCourseFormGroupService } from '../../form-groups/sub-course-form-group.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { ServiceFormGroupService } from '../../form-groups/service-form-group.service';
import { SubCourse } from 'apps/tmkn/src/app/feature-module/courses-management/model/sub-course.model';
import { ServiceCourse } from 'apps/tmkn/src/app/feature-module/courses-management/model/service-course.model';

@Component({
  selector: 'app-service-form-dialog',
  standalone: false,

  templateUrl: './service-form-dialog.component.html',
  styleUrl: './service-form-dialog.component.scss',
})
export class ServiceFormDialogComponent implements OnInit {
  private readonly translateService = inject(TranslateService);
  private serviceFormGroupService = inject(ServiceFormGroupService);
  private subCoursesService = inject(SubCoursesService);
  public dialogRef = inject(MatDialogRef<ServiceFormDialogComponent>);
  public data: any = inject(MAT_DIALOG_DATA);

  isEditMode = false;
  serviceFg!: FormGroup;

  async ngOnInit(): Promise<void> {
    if (this.data && this.data.id) {
      this.isEditMode = true;
      await this.loadEditForm(this.data.id);
    } else {
      this.serviceFg = this.serviceFormGroupService.initialize();
    }
  }

  async loadEditForm(id: number) {
    const data = await lastValueFrom(this.subCoursesService.getById(id)) as ServiceCourse ;
    this.serviceFg = this.serviceFormGroupService.initialize(data);
  }

  onSubmit() {
    let data = this.serviceFormGroupService.getValue();
    data = {
      ...data,
      type: CourseManagementType.Service,
    };
    if (this.isEditMode) {
      this.subCoursesService.update(data.id, data).subscribe();
    } else {
      this.subCoursesService.create(data).subscribe((data) => {
        console.log('Res: ', data);
      });
    }
    this.dialogRef.close();
  }
}
