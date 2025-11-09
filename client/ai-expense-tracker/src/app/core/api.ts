import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { environment } from '../../environments/environment';

export interface ApiResponse<T> {
  ok: boolean;
  data: T;
  error?: string;
}

@Injectable({
  providedIn: 'root',
})
export class Api {

  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: environment.apiUrl,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Generic methods
  get<T>(url: string) {
    return this.client.get<ApiResponse<T>>(url).then(r => r.data);
  }

  post<T>(url: string, data: any) {
    return this.client.post<ApiResponse<T>>(url, data).then(r => r.data);
  }

  put<T>(url: string, data: any) {
    return this.client.put<ApiResponse<T>>(url, data).then(r => r.data);
  }

  delete<T>(url: string) {
    return this.client.delete<ApiResponse<T>>(url).then(r => r.data);
  }
}
