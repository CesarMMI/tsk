import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class CrudService<T> {
	protected _http = inject(HttpClient);
	protected _baseUrl: string = '';

	public readAll() {
		return this._http.get<T[]>(this._baseUrl);
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
		return this._http.delete<T>(`${this._baseUrl}/${id}`);
	}
}
