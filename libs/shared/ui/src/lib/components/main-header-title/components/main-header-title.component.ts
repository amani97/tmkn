import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  input,
  OnInit,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { filter } from 'rxjs';
import { Breadcrumb } from '../model/breadcrumb.dto';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'tm-ui-main-header-title',
  templateUrl: './main-header-title.component.html',
  styleUrls: ['./main-header-title.component.scss'],
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDividerModule, RouterModule],
})
export class MainHeaderTitleComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly translate = inject(TranslateService);

  static readonly ROUTE_DATA_BREADCRUMB = 'breadcrumb';
  mainTitle = input.required<string>();
  showPrevButton = input<boolean>(false);
  prevButtonTitle = input<string>(this.translate.instant('general.back'));
  prevButtonLink = input<string>();
  showPrevIcon = input<boolean>(false);

  breadcrumbs!: Breadcrumb[];

  @Output() clickPrevButton = new EventEmitter<null>();

  constructor() {}

  ngOnInit(): void {
    this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
      });
  }

  onClickPrevButton() {
    if (this.prevButtonLink()) {
      this.router.navigate([this.prevButtonLink()]);
    } else {
      this.clickPrevButton.emit();
    }
  }

  private createBreadcrumbs(
    route: ActivatedRoute,
    url: string = '#',
    breadcrumbs: Breadcrumb[] = []
  ): any {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url
        .map((segment) => segment.path)
        .join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label =
        child.snapshot.data[MainHeaderTitleComponent.ROUTE_DATA_BREADCRUMB];
      if (label !== null && label !== undefined) {
        const translatedLabel = this.translate.instant(label);
        breadcrumbs.push({ label: translatedLabel, url });
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
  }
}
