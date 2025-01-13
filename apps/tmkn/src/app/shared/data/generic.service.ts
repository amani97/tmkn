import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export abstract class GenericService<T> {
  protected data: T[] = [];
  protected isDataLoaded = false;

  constructor(protected http: HttpClient, protected apiUrl: string) {}

  /**
   * Fetch all items from the API or local data storage.
   */
  public getList(): Observable<T[]> {
    if (this.isDataLoaded) {
      return of(this.data);
    }

    return this.http.get<T[]>(this.apiUrl).pipe(
      tap((items: T[]) => {
        this.data = items;
        this.isDataLoaded = true;
      })
    );
  }

  /**
   * Fetch a single item by ID.
   */
  public getById(id: number): Observable<T | undefined> {
    if (this.isDataLoaded) {
      const item = this.data.find((item: any) => item.id === Number(id));
      return of(item);
    }

    return this.http.get<T[]>(this.apiUrl).pipe(
      map((items: T[]) => items.find((item: any) => item.id === Number(id))),
      tap((item) => {
        if (item && !this.isDataLoaded) {
          this.data.push(item);
        }
      })
    );
  }

  /**
   * Create a new item.
   */
  public create(item: T): Observable<T[]> {
    const newItem = { ...item, id: this.data.length + 1 };
    this.data.push(newItem);
    return of(this.data);
  }

  /**
   * Update an existing item by ID.
   */
  public update(id: number, updatedItem: Partial<T>): Observable<T[]> {
    const index = this.data.findIndex((item: any) => item.id === id);
    if (index > -1) {
      this.data[index] = { ...this.data[index], ...updatedItem };
    }
    return of(this.data);
  }

  /**
   * Delete an item by ID.
   */
  public delete(id: number): Observable<T[]> {
    this.data = this.data.filter((item: any) => item.id !== id);
    return of(this.data);
  }
}
