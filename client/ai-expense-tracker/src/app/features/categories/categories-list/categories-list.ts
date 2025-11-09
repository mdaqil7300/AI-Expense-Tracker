import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryModel, Category } from '../../../core/category';

@Component({
  selector: 'app-categories-list',
  imports: [CommonModule],
  templateUrl: './categories-list.html',
  styleUrl: './categories-list.css',
})
export class CategoriesList implements OnInit {
  categories: CategoryModel[] = [];

  constructor(private categoryService: Category) { }

  ngOnInit() { 
    this.load(); 
  }

  load() {
    this.categoryService.getAll().then(res => {
      console.log(res,"data loaded")
      this.categories = res.data
    });
  }
}
