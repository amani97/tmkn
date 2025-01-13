import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  AfterViewInit,
  Directive,
  Host,
  Input,
  OnChanges,
  Optional,
  Renderer2,
  Self,
  SimpleChanges,
  ViewContainerRef,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatPaginator } from '@angular/material/paginator';

interface PageObject {
  length: number;
  pageIndex: number;
  pageSize: number;
  previousPageIndex: number;
}

@Directive({
  selector: '[tmUiStylePaginator]',
  standalone: true,
})
export class StylePaginatorDirective implements AfterViewInit, OnChanges {
  private _pageGapTxt = '...';
  private _rangeStart!: number;
  private _rangeEnd!: number;
  private _buttons: MatButton[] = [];
  private initialized = false;
  private _curPageObj: PageObject = {
    length: 0,
    pageIndex: 0,
    pageSize: 0,
    previousPageIndex: 0,
  };
  private _pageNumbersContainer: HTMLSpanElement;

  @Input() length!: number;
  private _showTotalPages = 2;
  @Input()
  get showTotalPages(): number {
    return this._showTotalPages;
  }

  set showTotalPages(value: number) {
    this._showTotalPages = value % 2 == 0 ? value + 1 : value;
  }

  get inc(): number {
    return this._showTotalPages % 2 == 0 ? this.showTotalPages / 2 : (this.showTotalPages - 1) / 2;
  }

  get numOfPages(): number {
    return this.matPag.getNumberOfPages();
  }

  get lastPageIndex(): number {
    return this.matPag.getNumberOfPages() - 1;
  }

  constructor(
    @Host() @Self() @Optional() private readonly matPag: MatPaginator,
    private vr: ViewContainerRef,
    private ren: Renderer2,
    private responsive: BreakpointObserver
  ) {
    this._pageNumbersContainer = this.ren.createElement('div');
    this.setupPageChangeSubscription();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['length'] && this.initialized) {
      this.handleLengthChange();
    }
  }

  ngAfterViewInit() {
    this._rangeStart = 0;
    this._rangeEnd = this._showTotalPages - 1;
    this.setupResponsiveObserver();
    this.initialized = true;
  }

  private setupPageChangeSubscription(): void {
    this.matPag.page.subscribe((e: PageObject) => {
      this.updatePageObject(e);
      this.setupResponsiveObserver();
    });
  }

  private handleLengthChange(): void {
    const pageObj: PageObject = {
      length: this.matPag.length,
      pageIndex: this.matPag.pageIndex,
      pageSize: this.matPag.pageSize,
      previousPageIndex: this.matPag.pageIndex,
    };
    this.updatePageObject(pageObj);
    this.setupResponsiveObserver();
  }

  private setupResponsiveObserver(): void {
    this.responsive.observe([Breakpoints.Small, Breakpoints.XSmall]).subscribe(data => {
      this.initPageRange(data.matches);
    });
  }

  private updatePageObject(e: PageObject): void {
    if (this._curPageObj.pageSize != e.pageSize && this._curPageObj.pageIndex != 0) {
      e.pageIndex = 0;
      this._rangeStart = 0;
      this._rangeEnd = this._showTotalPages - 1;
    }
    this._curPageObj = e;
  }

  private initPageRange(isMobile = false): void {
    const middleIndex = (this._rangeStart + this._rangeEnd) / 2;

    this._rangeStart = this.calcRangeStart(middleIndex);
    this._rangeEnd = this.calcRangeEnd(middleIndex);

    this.buildPageNumbers(isMobile);
  }

  private calcRangeStart(middleIndex: number): number {
    switch (true) {
      case this._curPageObj.pageIndex == 0 && this._rangeStart != 0:
        return 0;
      case this._curPageObj.pageIndex > this._rangeEnd:
        return this._curPageObj.pageIndex + this.inc > this.lastPageIndex
          ? this.lastPageIndex - this.inc * 2
          : this._curPageObj.pageIndex - this.inc;
      case this._curPageObj.pageIndex > this._curPageObj.previousPageIndex &&
        this._curPageObj.pageIndex > middleIndex &&
        this._rangeEnd < this.lastPageIndex:
        return this._rangeStart + 1;
      case this._curPageObj.pageIndex < this._curPageObj.previousPageIndex &&
        this._curPageObj.pageIndex < middleIndex &&
        this._rangeStart > 0:
        return this._rangeStart - 1;
      default:
        return this._rangeStart;
    }
  }

  private calcRangeEnd(middleIndex: number): number {
    switch (true) {
      case this._curPageObj.pageIndex == 0 && this._rangeEnd != this._showTotalPages:
        return this._showTotalPages - 1;
      case this._curPageObj.pageIndex > this._rangeEnd:
        return this._curPageObj.pageIndex + this.inc > this.lastPageIndex
          ? this.lastPageIndex
          : this._curPageObj.pageIndex + 1;
      case this._curPageObj.pageIndex > this._curPageObj.previousPageIndex &&
        this._curPageObj.pageIndex > middleIndex &&
        this._rangeEnd < this.lastPageIndex:
        return this._rangeEnd + 1;
      case this._curPageObj.pageIndex < this._curPageObj.previousPageIndex &&
        this._curPageObj.pageIndex < middleIndex &&
        this._rangeStart >= 0 &&
        this._rangeEnd > this._showTotalPages - 1:
        return this._rangeEnd - 1;
      default:
        return this._rangeEnd;
    }
  }
  private switchPage(i: number): void {
    const previousPageIndex = this.matPag.pageIndex;
    this.matPag.pageIndex = i;
    this.matPag['_emitPageEvent'](previousPageIndex);
    this.initPageRange();
  }

  private buildPageNumbers(isMobile = false): void {
    this.stylePaginatorElements(isMobile);

    this.clearPreviousButtons(isMobile);

    let dots = false;
    if (!isMobile) {
      this.buildPaginatorButtons(dots);
    }
  }

  private stylePaginatorElements(isMobile: boolean): void {
    const primaryColor = window
      .getComputedStyle(document.body)
      .getPropertyValue('--clinic-pulse-primary-color');

    const paginatorRangeLabel = this.vr.element.nativeElement.querySelector(
      'div.mat-mdc-paginator-range-label'
    );
    this.ren.setStyle(paginatorRangeLabel, 'display', 'none');

    const paginatorPageSize = this.vr.element.nativeElement.querySelector(
      'div.mat-mdc-paginator-page-size'
    );
    this.ren.setStyle(paginatorPageSize, 'display', 'none');

    const prevPageNode = this.vr.element.nativeElement.querySelector(
      'button.mat-mdc-paginator-navigation-previous'
    );

    this.ren.setStyle(this._pageNumbersContainer, 'height', '35px');
    this.ren.setStyle(this._pageNumbersContainer, 'display', 'flex');
    this.ren.setStyle(this._pageNumbersContainer, 'justify-content', 'center');
    this.ren.setStyle(this._pageNumbersContainer, 'align-items', 'center');
    this.ren.setStyle(this._pageNumbersContainer, 'align-self', 'center');
    this.ren.setStyle(this._pageNumbersContainer, 'justify-self', 'center');
    this.ren.setStyle(this._pageNumbersContainer, 'background', '#F3F2F7');
    this.ren.setStyle(this._pageNumbersContainer, 'border-radius', '16px');
    this.ren.setStyle(this._pageNumbersContainer, 'padding', '0 20px');
    this.ren.setStyle(this._pageNumbersContainer, 'gap', '5px');

    if (isMobile) {
      this.ren.setStyle(this._pageNumbersContainer, 'background', 'inherit');
    }
    prevPageNode.parentNode.insertBefore(this._pageNumbersContainer, prevPageNode.nextSibling);
  }

  private clearPreviousButtons(isMobile: boolean): void {
    if (this._buttons.length > 0) {
      this._buttons.forEach(button => {
        this.ren.removeChild(this._pageNumbersContainer, button);
        if (isMobile) {
          this.ren.setStyle(this._pageNumbersContainer, 'background', 'inherit');
        }
      });
      this._buttons.length = 0;
    }
  }

  private buildPaginatorButtons(dots: boolean): void {
    for (let i = 0; i < this.numOfPages; i++) {
      if (i >= this._rangeStart && i <= this._rangeEnd) {
        this.ren.appendChild(this._pageNumbersContainer, this.createButton(i, this.matPag.pageIndex));
      } else if (i > this._rangeEnd && i >= this.matPag.getNumberOfPages() - 2) {
        if (this._curPageObj.pageIndex < this.matPag.getNumberOfPages() - this._showTotalPages) {
          if (i >= this._showTotalPages - this._curPageObj.pageIndex && !dots) {
            this.ren.appendChild(
              this._pageNumbersContainer,
              this.createButton(this._pageGapTxt, this.matPag.pageIndex)
            );
            dots = true;
          }
          this.ren.appendChild(this._pageNumbersContainer, this.createButton(i, this.matPag.pageIndex));
        }
      } else if (i <= this._rangeStart && i < this._showTotalPages) {
        this.ren.appendChild(this._pageNumbersContainer, this.createButton(i, this.matPag.pageIndex));
        if (
          i == this._showTotalPages - 1 &&
          this._curPageObj.pageIndex >= this._showTotalPages &&
          !dots
        ) {
          this.ren.appendChild(
            this._pageNumbersContainer,
            this.createButton(this._pageGapTxt, this.matPag.pageIndex)
          );
          dots = true;
        }
      }
    }
  }

  private createButton(i: number | string, pageIndex: number): MatButton {
    const button: MatButton = this.ren.createElement('button') as MatButton;

    // Add required classes and attributes
    this.ren.addClass(button, 'mdc-button');
    this.ren.addClass(button, 'mat-mdc-button');
    this.ren.addClass(button, 'mat-unthemed');
    this.ren.addClass(button, 'mat-mdc-button-base');

    this.ren.setAttribute(button, 'mat-button', '');
    this.ren.setAttribute(button, 'mat-ripple-loader-class-name', 'mat-mdc-button-ripple');

    this.ren.setStyle(button, 'padding', '0');
    this.ren.setStyle(button, 'min-width', '45px');
    this.ren.setStyle(button, 'min-height', '45px');

    // Add persistent ripple elements
    const ripplePersistent = this.ren.createElement('span');
    this.ren.addClass(ripplePersistent, 'mat-mdc-button-persistent-ripple');
    this.ren.addClass(ripplePersistent, 'mdc-button__ripple');
    this.ren.appendChild(button, ripplePersistent);

    // Create and set the label span with the page number or gap text
    const labelSpan = this.ren.createElement('span');
    this.ren.addClass(labelSpan, 'mdc-button__label');

    this.ren.setStyle(button, 'font-size', '1rem');
    this.ren.setStyle(button, 'font-weight', 'bold');

    const pagingTxt = typeof i === 'string' ? this._pageGapTxt : +i + 1;
    const text = this.ren.createText(pagingTxt.toString());
    this.ren.appendChild(labelSpan, text);
    this.ren.appendChild(button, labelSpan);

    // Add additional span elements for focus indicators and touch target
    this.addAdditionalSpans(button);

    // Configure button actions based on the page index
    this.configureButtonActions(button, i, pageIndex);

    // Add button to the private array for state
    this._buttons.push(button);
    return button;
  }

  private addAdditionalSpans(button: MatButton): void {
    // Add focus indicator span
    const focusIndicatorSpan = this.ren.createElement('span');
    this.ren.addClass(focusIndicatorSpan, 'mat-mdc-focus-indicator');
    this.ren.appendChild(button, focusIndicatorSpan);

    // Add touch target span
    const touchTargetSpan = this.ren.createElement('span');
    this.ren.addClass(touchTargetSpan, 'mat-mdc-button-touch-target');
    this.ren.appendChild(button, touchTargetSpan);

    // Add ripple effect span
    const rippleSpan = this.ren.createElement('span');
    this.ren.addClass(rippleSpan, 'mat-ripple');
    this.ren.addClass(rippleSpan, 'mat-mdc-button-ripple');
    this.ren.appendChild(button, rippleSpan);
  }

  private configureButtonActions(button: MatButton, i: number | string, pageIndex: number): void {
    if (i === pageIndex) {
      // Disable the button if it's the current page
      this.ren.setAttribute(button, 'disabled', 'true');
      this.ren.removeClass(button, 'mat-mdc-button');
      this.ren.addClass(button, 'mdc-button--unelevated');
      this.ren.addClass(button, 'mat-mdc-unelevated-button');
      this.ren.removeAttribute(button, 'mat-button');
      this.ren.setAttribute(button, 'mat-flat-button', '');
      const primaryColor = window
        .getComputedStyle(document.body)
        .getPropertyValue('--clinic-pulse-primary-color');
      this.ren.setStyle(button, 'background-color', primaryColor);
      this.ren.setStyle(button, 'color', 'white');
    } else if (i === this._pageGapTxt) {
      // Handle the case for gap text ('...')
      let newIndex = this._curPageObj.pageIndex + this._showTotalPages;
      if (newIndex >= this.numOfPages) {
        newIndex = this.lastPageIndex;
      }

      if (pageIndex !== this.lastPageIndex) {
        this.ren.listen(button, 'click', () => this.switchPage(newIndex));
      }

      if (pageIndex === this.lastPageIndex) {
        this.ren.setAttribute(button, 'disabled', 'true');
      }
    } else {
      // Set up a click listener for normal page numbers
      this.ren.listen(button, 'click', () => this.switchPage(Number(i)));
    }
  }
}
