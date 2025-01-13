export class Pagination {
  pageIndex = 0;
  pageSize = 15;
  totalCount!: number;
  totalPages!: number;
  hasPrevious!: boolean;
  hasNext!: boolean;

  constructor (pageSize: number) {
    this.pageSize = pageSize;
  }
}
