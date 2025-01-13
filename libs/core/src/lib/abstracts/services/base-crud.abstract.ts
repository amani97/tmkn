import { inject, Injectable, Injector } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pagination } from '@tmkn/ui';
import { catchError, lastValueFrom, map, Observable, of, throwError } from 'rxjs';
import { BaseCommand } from '../../models/command/base-command.command';
import { BaseLibConfig } from '../../models/dtos';

@Injectable()
export abstract class IBaseCrudService<
  DataDto,
  CreateCommand,
  UpdateCommand extends BaseCommand,
  DeleteCommand extends BaseCommand,
  SearchCriteria extends object,
> {
  protected readonly http = inject(HttpClient);
  private readonly injector = inject(Injector);
  public readonly API_ENDPOINT: string;

  constructor(
    protected baseLibConfig: BaseLibConfig,
    protected endpointPath: string
  ) {
    this.http = this.injector.get(HttpClient);
    this.API_ENDPOINT = this.baseLibConfig.baseAPI;
  }

  // TODO: Make it Optional
  public async get(
    pagination: Pagination,
    searchCriteria?: SearchCriteria
  ): Promise<{
    dataList: DataDto[];
    pagination: any;
  }> {
    let params = new HttpParams()
      .set('PaginationParameters.PageSize', pagination.pageSize)
      .set('PaginationParameters.PageIndex', pagination.pageIndex);

    if (searchCriteria) {
      params = this.getHttpParamsFromSearchCriteria(searchCriteria, params);
    }

    try {
      return await lastValueFrom(
        this.http
          .get<{
            data: DataDto[];
            pagination: Pagination;
          }>(`${this.API_ENDPOINT}/${this.endpointPath}`, { params })
          .pipe(
            map(data => ({
              dataList: data.data,
              pagination: data.pagination,
            })),
            catchError(error => {
              return throwError(() => new Error(error.message)) as Observable<{
                dataList: DataDto[];
                pagination: any;
              }>;
            })
          )
      );
    } catch (error) {
      console.error('TM Error: ', error);
      return await lastValueFrom(of({ dataList: [], pagination: new Pagination(0) }));
    }
  }

  public async getById(id: string): Promise<DataDto> {
    return await lastValueFrom(
      this.http.get<DataDto>(`${this.API_ENDPOINT}/${this.endpointPath}/${id}`)
    );
  }

  public async create(command: CreateCommand): Promise<string> {
    return await lastValueFrom(
      this.http.post<string>(`${this.API_ENDPOINT}/${this.endpointPath}`, command)
    );
  }

  public async update(command: UpdateCommand): Promise<void> {
    return await lastValueFrom(
      this.http.put<void>(`${this.API_ENDPOINT}/${this.endpointPath}/${command.id}`, command)
    );
  }

  public async delete(command: DeleteCommand): Promise<void> {
    return await lastValueFrom(
      this.http.delete<void>(`${this.API_ENDPOINT}/${this.endpointPath}/${command.id}`)
    );
  }

  protected getHttpParamsFromSearchCriteria(
    searchCriteria: SearchCriteria,
    params: HttpParams
  ): HttpParams {
    Object.keys(searchCriteria).forEach((key: string) => {
      if (searchCriteria[key as keyof typeof searchCriteria]) {
        params = params.append(
          key.charAt(0).toUpperCase() + key.slice(1),
          searchCriteria[key as keyof typeof searchCriteria] as string | number | boolean
        );
      }
    });

    return params;
  }
}
