import { Injectable } from '@angular/core';
import { Api } from './api';

export interface ExpenseModel {
  id?: string;
  date: string;
  amount: number;
  currency: string;
  vendor?: string;
  notes?: string;
  categoryId?: string;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root',
})

export class Expense {
  constructor(private api: Api) {}

  getAll() { return this.api.get<ExpenseModel[]>('/expenses'); }
  create(data: ExpenseModel) { return this.api.post<ExpenseModel>('/expenses', data); }
  update(id: string, data: ExpenseModel) { return this.api.put<ExpenseModel>(`/expenses/${id}`, data); }
  delete(id: string) { return this.api.delete(`/expenses/${id}`); }
}
