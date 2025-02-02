import { Component, Renderer2 } from '@angular/core';
import {
  PaginationService,
  tablePageSize,
} from '../../../shared/custom-pagination/pagination.service';
import {
  apiResultFormat,
  examData,
  pageSelection,
} from '../../courses-management/model/pages.model';

import { DataService } from '../../courses-management/data/data.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Sort } from '@angular/material/sort';
import { routes } from '../../../shared/routes/routes';
import {FormGroup} from '@angular/forms';
import {QuestionsFormDialogComponent} from '../../courses-management/components/questions-form-dialog/questions-form-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {QuizFormDialogComponent} from '../../courses-management/components/quiz-form-dialog/quiz-form-dialog.component';
import {QuizService} from '../../courses-management/data/quiz.service';
import {QuizModel} from '../../courses-management/model/question.model';

interface data {
  name: string;
  code: string;
}

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrl: './exam-list.component.scss',
  standalone: false,
})
export class ExamListComponent {
  public routes = routes;
  starttime: data[] | undefined;
  selectedEndtime: data | undefined;
  selectedEndtime1: data | undefined;
  endtime: data[] | undefined;
  selectedStarttime: data | undefined;
  selectedStarttime1: data | undefined;
  type: data[] | undefined;
  selectedType: data | undefined;
  selectedType1: data | undefined;
  bsValue = new Date();
  initChecked = false;
  formData: { selectedClass: data | undefined }[] = [];
  public pageSize = 10;
  public tableData: Array<QuizModel> = [];
  public tableDataCopy: Array<QuizModel> = [];
  public actualData: Array<QuizModel> = [];
  public currentPage = 1;

  // pagination variables

  public skip = 0;
  public limit: number = this.pageSize;

  public serialNumberArray: Array<number> = [];
  public totalData = 0;
  showFilter = false;
  public pageSelection: pageSelection[] = [];
  dataSource!: MatTableDataSource<QuizModel>;
  public searchDataValue = '';
  sectionOptions = [
    { label: 'A ', value: '1' },
    { label: 'B', value: '2' },
    { label: 'C', value: '3' },
  ];
  examNameOptions = [
    { label: 'Week text ', value: '1' },
    { label: 'Mothly Test', value: '2' },
    { label: 'Chapter Wise text ', value: '3' },
    { label: 'Unit Test', value: '4' },
  ];
  durationOptions = [
    { label: 'Select ', value: '1' },
    { label: '3hrs', value: '2' },
  ];
  examDateOptions = [
    { label: '13 May 2024 ', value: '1' },
    { label: '14 May 2024', value: '2' },
    { label: '15 May 2024', value: '3' },
  ];
  subjectOptions = [
    { label: 'English ', value: '1' },
    { label: 'Spanish', value: '2' },
    { label: 'Physics', value: '3' },
  ];
  roomNoOptions = [
    { label: '101 ', value: '1' },
    { label: '102', value: '2' },
    { label: '103', value: '3' },
  ];
  maxMarksOptions = [
    { label: 'Select ', value: '1' },
    { label: '100', value: '2' },
  ];
  minMarksOptions = [
    { label: 'Select ', value: '1' },
    { label: '35', value: '2' },
  ];
  examFg!: FormGroup;
  constructor(
    private renderer: Renderer2,
    private data: DataService,
    private pagination: PaginationService,
    private router: Router,
    private dialog: MatDialog,
    private quizService: QuizService
  ) {
    this.quizService.getList().subscribe((result) => {
      console.log(result);
     this.tableData = result
     console.log(this.tableData);
    });
  }

  public handleApplyClick = () => {
    const modalElements = document.getElementsByClassName('drop-width');
    if (modalElements.length > 0) {
      for (let i = 0; i < modalElements.length; i++) {
        const modalElement = modalElements[i];
        this.renderer.removeClass(modalElement, 'show');
      }
    }
  };
  ngOnInit() {
    this.starttime = [
      { name: '09:30 AM', code: '1' },
      { name: '10:30 AM', code: '2' },
      { name: '11:30 AM', code: '3' },
      { name: '12:30 PM', code: '3' },
    ];
    this.endtime = [
      { name: '10:30 AM', code: '1' },
      { name: '11:30 AM', code: '2' },
      { name: '12:30 PM', code: '3' },
      { name: '1:30 PM', code: '4' },
    ];
    this.type = [
      { name: 'Select', code: '1' },
      { name: 'Class', code: '2' },
    ];
    this.selectedType1 = this.type[1];
    this.selectedStarttime1 = this.starttime[1];
    this.selectedEndtime1 = this.endtime[1];
  }
  private getTableData(pageOption: pageSelection): void {
    this.quizService.getList().subscribe((result) => {
      this.tableData = result;
      this.tableDataCopy = [];
      this.serialNumberArray = [];
     
      this.pagination.calculatePageSize.next({
        totalData: this.totalData,
        pageSize: this.pageSize,
        tableData: this.tableData,
        tableDataCopy: this.tableDataCopy,
        serialNumberArray: this.serialNumberArray,
      });
    });
  }

  public sortData(sort: Sort) {
    const data = this.tableData.slice();
    if (!sort.active || sort.direction === '') {
      this.tableData = data;
    } else {
      this.tableData = data.sort((a, b) => {
        const aValue = (a as never)[sort.active];
        const bValue = (b as never)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }
  public searchData(value: string): void {
    if (value == '') {
      this.tableData = this.tableDataCopy;
    } else {
      this.dataSource.filter = value.trim().toLowerCase();
      this.tableData = this.dataSource.filteredData;
    }
  }
  // selectAll(initChecked: boolean) {
  //   if (!initChecked) {
  //     this.tableData.forEach((f) => {
  //       f.isSelected = true;
  //     });
  //   } else {
  //     this.tableData.forEach((f) => {
  //       f.isSelected = false;
  //     });
  //   }
  // }

  addNewRow() {
    this.formData.push({ selectedClass: { name: '', code: '' } });
  }
  removeRow(index: number) {
    this.formData.splice(index, 1);
  }

  open() {
    this.dialog.open(QuizFormDialogComponent);
  }
}
