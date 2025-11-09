import { nanoid } from 'nanoid';
import type { Category, Expense } from './types.js';


export const db = {
    categories: [] as Category[],
    expenses: [] as Expense[]
};


// Seed a couple of categories
export function seed() {
    if (db.categories.length === 0) {
        const now = new Date().toISOString();
        db.categories.push(
            { id: nanoid(), name: 'Food', color: '#22c55e', icon: 'utensils', createdAt: now },
            { id: nanoid(), name: 'Transport', color: '#3b82f6', icon: 'bus', createdAt: now },
            { id: nanoid(), name: 'Shopping', color: '#f59e0b', icon: 'shopping-bag', createdAt: now }
        );
    }
}