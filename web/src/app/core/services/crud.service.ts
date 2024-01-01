import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export abstract class CrudService<T> {
  protected _http = inject(HttpClient);
  protected abstract _baseUrl: string;

  public readAll(params?: { [key: string]: any }) {
    let paramsObj = new HttpParams({ fromObject: params });
    return this._http.get<T[]>(this._baseUrl, { params: paramsObj });
  }

  public readById(id: string) {
    return this._http.get<T>(`${this._baseUrl}/${id}`);
  }

  public create(value: Partial<T>) {
    return this._http.post<T>(this._baseUrl, value);
  }

  public update(id: string, value: Partial<T>) {
    return this._http.patch<T>(`${this._baseUrl}/${id}`, value);
  }

  public delete(id: string) {
    return this._http.delete(`${this._baseUrl}/${id}`);
  }
}
