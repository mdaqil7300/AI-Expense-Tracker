import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ExpenseModel, Expense} from '../../../core/expense'

@Component({
  selector: 'app-expenses-list',
  imports: [CommonModule],
  templateUrl: './expenses-list.html',
  styleUrl: './expenses-list.css',
})
export class ExpensesList implements OnInit {
  expenses: ExpenseModel[] = [];

  constructor(private expenseService: Expense) {}

  ngOnInit() { 
    this.load(); 
  }

  load() {
    this.expenseService.getAll().then(data => {
      console.log(data, "expense data")
      this.expenses = data.data
    });
  }
}
