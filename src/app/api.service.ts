import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private readonly API_BASE = 'http://localhost:8080/v1';

  constructor(private http: HttpClient) {}

  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.API_BASE}/${endpoint}`, body);
  }

  getWithQuery<T>(endpoint: string, queryParams: { [key: string]: any }): Observable<T> {
    let params = new HttpParams();
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params = params.set(key, value);
      }
    });
    return this.http.get<T>(`${this.API_BASE}/${endpoint}`, { params });
  }

  getById<T>(endpoint: string, id: string | number): Observable<T> {
    return this.http.get<T>(`${this.API_BASE}/${endpoint}/${id}`);
  }

  put<T>(endpoint: string, id: string | number, body: any): Observable<T> {
    return this.http.put<T>(`${this.API_BASE}/${endpoint}/${id}`, body);
  }

  delete<T>(endpoint: string, id: string | number): Observable<T> {
    return this.http.delete<T>(`${this.API_BASE}/${endpoint}/${id}`);
  }
}
