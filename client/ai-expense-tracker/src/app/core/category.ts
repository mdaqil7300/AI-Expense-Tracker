import { Injectable } from '@angular/core';
import { Api } from './api';

export interface CategoryModel {
  id?: string;
  name: string;
  color?: string;
  icon?: string;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root',
})
export class Category {
  constructor(private api: Api) { }

  getAll() { 
    return this.api.get<CategoryModel[]>('/categories'); 
  }
  
  create(data: CategoryModel) { 
    return this.api.post<CategoryModel>('/categories', data); 
  }
  
  update(id: string, data: CategoryModel) { 
    return this.api.put<CategoryModel>(`/categories/${id}`, data); 
  }
  
  delete(id: string) { 
    return this.api.delete(`/categories/${id}`); 
  }
}
