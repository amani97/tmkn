import { Component, Renderer2 } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import {
  PaginationService,
  tablePageSize,
} from '../../../shared/custom-pagination/pagination.service';

import { DataService } from '../../courses-management/data/data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Pagination } from '@tmkn/ui';
import { QuestionsFormDialogComponent } from '../../courses-management/components/questions-form-dialog/questions-form-dialog.component';
import { QuizFormDialogComponent } from '../../courses-management/components/quiz-form-dialog/quiz-form-dialog.component';
import { QuizModel } from '../../courses-management/model/question.model';
import { QuizService } from '../../courses-management/data/quiz.service';
import { Router } from '@angular/router';
import { Sort } from '@angular/material/sort';
import { TmTableMetaData } from 'libs/shared/ui/src/lib/components/table/models';
import { pageSelection } from '../../courses-management/model/pages.model';
import { routes } from '../../../shared/routes/routes';

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
  quiz$!: Observable<QuizModel[]>;
  loading$!: Observable<boolean>;
  pagination$: Observable<Pagination> = of(new Pagination(1));
  coursesMetaData: TmTableMetaData<QuizModel> = {
    columns: [
      {
        columnDef: 'id',
        header: 'Id',
        cell: (element: QuizModel) => `${element.id}`,
        type: 'link',
      },
      {
        columnDef: 'title',
        header: 'Title',
        cell: (element: QuizModel) => `${element.title}`,
      },
      {
        columnDef: 'duration',
        header: 'Duration',
        cell: (element: QuizModel) => `${element.duration}`,
      },
      {
        columnDef: 'section',
        header: 'Section',
        cell: (element: QuizModel) => `${element.section}`,
      },
      {
        columnDef: 'class',
        header: 'Class',
        cell: (element: QuizModel) => `${element.class}`,
      },
      {
        columnDef: 'active',
        header: 'Active',
        cell: (element: QuizModel) => `${element.isRandomize ? 'Yes' : 'No'}`,
        type: 'highlighted',
        highlightedLogic: (element: QuizModel) => {
          return element.isRandomize ? 'green' : 'red';
        },
      },
      {
        columnDef: 'accepted',
        header: 'Accepted',
        cell: (element: QuizModel) => `${element.isShareable ? 'Yes' : 'No'}`,
        type: 'highlighted',
        highlightedLogic: (element: QuizModel) => {
          return element.isShareable ? 'green' : 'red';
        },
      },
    ],
    actions: [
      {
        icon: 'ti ti-edit',
        color: 'accent',
        title: 'Edit',
        action: (element: QuizModel) => {},
        visibleCondition: () => true,
      },
      {
        icon: 'ti ti-trash',
        color: 'warn',
        title: 'Delete',
        action: (element: QuizModel) => {},
        visibleCondition: () => true,
      },
      {
        icon: 'ti ti-question-mark',
        title: 'Add Questions',
        color: 'primary',
        action: (element: QuizModel) => this.addQuestions(),
        visibleCondition: () => true,
      },
    ],
    otherActions: [],
  };
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
      this.tableData = result;
      console.log(this.tableData);
    });
    this.quiz$ = this.quizService.getList().pipe(map((x) => x));
    this.loading$ = this.quiz$.pipe(map((x) => x.length === 0));
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
  ngOnInit() {}

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

  addQuestions = () => {
    this.dialog.open(QuestionsFormDialogComponent, {
      minWidth: '95vw',
      minHeight: '80vh',
      disableClose: true,
      data: {
        id: 5,
      },
    });
  };
}
