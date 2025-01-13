import { Pagination } from '@tmkn/ui';

export interface BaseCrudState<DataDto, SearchCriteria> {
  dataList: DataDto[];
  pagination: Pagination;
  searchCriteria?: SearchCriteria;
  loading: boolean;
  loadingCRUD: boolean;
}
