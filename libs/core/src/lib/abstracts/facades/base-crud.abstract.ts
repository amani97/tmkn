import { Injectable } from '@angular/core';
import { Pagination } from '@tmkn/ui';
import {
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  map,
  Observable,
} from 'rxjs';
import { BaseCommand } from '../../models/command';
import { BaseCrudState } from '../../models/states';
import { IBaseCrudService } from '../services';

@Injectable()
export abstract class IBaseCrudFacade<
  DataDto,
  DataState extends BaseCrudState<DataDto, SearchCriteria>,
  CreateCommand,
  UpdateCommand extends BaseCommand,
  DeleteCommand extends BaseCommand,
  SearchCriteria extends object
> {
  protected store = new BehaviorSubject<DataState>(<DataState>{});
  protected state$ = this.store.asObservable();
  public get pagination(): Pagination {
    return this.state.pagination;
  }
  public get searchCriteria(): SearchCriteria | undefined {
    return this.state.searchCriteria;
  }
  public get state(): DataState {
    return this.store.value;
  }

  public dataList$: Observable<DataDto[]> = this.state$.pipe(
    map((state: DataState) => state.dataList),
    distinctUntilChanged()
  );
  public pagination$: Observable<Pagination> = this.state$.pipe(
    map((state: DataState) => state.pagination),
    distinctUntilChanged()
  );
  public searchCriteria$: Observable<SearchCriteria | undefined> =
    this.state$.pipe(
      map((state: DataState) => state?.searchCriteria),
      distinctUntilChanged()
    );
  public loading$: Observable<boolean> = this.state$.pipe(
    map((state: DataState) => state.loading),
    distinctUntilChanged()
  );
  public loadingCRUD$: Observable<boolean> = this.state$.pipe(
    map((state: DataState) => state.loadingCRUD),
    distinctUntilChanged()
  );
  public viewModel$: Observable<BaseCrudState<DataDto, SearchCriteria>> =
    combineLatest([
      this.dataList$,
      this.pagination$,
      this.searchCriteria$,
      this.loading$,
      this.loadingCRUD$,
    ]).pipe(
      map(([dataList, pagination, searchCriteria, loading, loadingCRUD]) => ({
        dataList,
        pagination,
        searchCriteria,
        loading,
        loadingCRUD,
      }))
    );

  public updateState(newState: DataState): void {
    this.store.next(newState);
  }

  constructor(
    private initialState: DataState,
    private baseCrudService: IBaseCrudService<
      DataDto,
      CreateCommand,
      UpdateCommand,
      DeleteCommand,
      SearchCriteria
    >
  ) {
    this.store.next(this.initialState);
  }

  public async load(): Promise<void> {
    this.updateState({ ...this.state, loading: true });
    const { dataList, pagination } = await this.baseCrudService.get(
      this.pagination,
      this.searchCriteria
    );

    this.updateState({
      ...this.state,
      dataList: dataList,
      pagination: pagination,
      loading: false,
    });
  }

  public async loadMore(): Promise<void> {
    if (!this.pagination.hasNext) {
      return;
    }

    const currentPagination = this.pagination;
    currentPagination.pageIndex++;

    this.updateState({ ...this.state, loading: true });
    const { dataList, pagination } = await this.baseCrudService.get(
      currentPagination,
      this.searchCriteria
    );

    const combinedDataList = [...this.state.dataList, ...dataList];
    this.updateState({
      ...this.state,
      dataList: combinedDataList,
      pagination: pagination,
      loading: false,
    });
  }

  public async create(
    command: CreateCommand,
    reloadList = true
  ): Promise<string | null> {
    try {
      this.updateState({ ...this.state, loadingCRUD: true });
      const id = await this.baseCrudService.create(command);
      this.updateState({ ...this.state, loadingCRUD: false });

      if (reloadList) {
        this.updateState({ ...this.state, loading: true });
        await this.load();
        this.updateState({ ...this.state, loading: false });
      }
      return id;
    } catch (error) {
      this.updateState({ ...this.state, loadingCRUD: false });
      return null;
    }
  }

  public async update(
    command: UpdateCommand,
    reloadList = true
  ): Promise<void> {
    try {
      this.updateState({ ...this.state, loadingCRUD: true });
      await this.baseCrudService.update(command);
      this.updateState({ ...this.state, loadingCRUD: false });

      if (reloadList) {
        this.updateState({ ...this.state, loading: true });
        await this.load();
        this.updateState({ ...this.state, loading: false });
      }
    } catch (error) {
      this.updateState({ ...this.state, loadingCRUD: false });
    }
  }

  public async delete(
    command: DeleteCommand,
    reloadList = true
  ): Promise<void> {
    try {
      this.updateState({ ...this.state, loadingCRUD: true });
      await this.baseCrudService.delete(command);
      this.updateState({ ...this.state, loadingCRUD: false });

      if (reloadList) {
        this.updateState({ ...this.state, loading: true });
        await this.load();
        this.updateState({ ...this.state, loading: false });
      }
    } catch (error) {
      this.updateState({ ...this.state, loadingCRUD: false });
    }
  }

  public async getById(id: string): Promise<DataDto> {
    const result = await this.baseCrudService.getById(id);
    return result;
  }
  public async updatePagination(pagination: Pagination): Promise<void> {
    this.updateState({
      ...this.state,
      pagination: pagination,
    });
    await this.load();
  }

  public async updateSearchCriteria(
    searchCriteria: SearchCriteria
  ): Promise<void> {
    const pagination = this.pagination;
    pagination.pageIndex = 0;
    this.updateState({
      ...this.state,
      searchCriteria: searchCriteria,
      pagination: pagination,
    });
    await this.load();
  }
}
