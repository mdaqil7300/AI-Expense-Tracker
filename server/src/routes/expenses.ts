import { Router } from 'express';
import { nanoid } from 'nanoid';
import { ok, badRequest, notFound } from '../utils/responders.js';
import { db } from '../db.js';
import { expenseSchema } from '../validators.js';

const router = Router();


router.get('/', (req, res) => {
    const { month, year, categoryId } = req.query as Record<string, string | undefined>;
    let items = db.expenses;


    if (year) items = items.filter(e => new Date(e.date).getUTCFullYear() === Number(year));
    if (month) items = items.filter(e => new Date(e.date).getUTCMonth() + 1 === Number(month));
    if (categoryId) items = items.filter(e => e.categoryId === categoryId);


    return ok(res, items.sort((a, b) => +new Date(b.date) - +new Date(a.date)));
});


router.get('/:id', (req, res) => {
    const item = db.expenses.find(e => e.id === req.params.id);
    if (!item) return notFound(res, 'Expense not found');
    return ok(res, item);
});


router.post('/', (req, res) => {
    const { error, value } = expenseSchema.validate(req.body);
    if (error) return badRequest(res, error.message);


    const now = new Date().toISOString();
    const expense = {
        id: nanoid(),
        createdAt: now,
        updatedAt: now,
        receiptUrl: undefined,
        ...value
    };
    db.expenses.push(expense);
    return ok(res, expense, 201);
});


router.put('/:id', (req, res) => {
    const idx = db.expenses.findIndex(e => e.id === req.params.id);
    if (idx === -1) return notFound(res, 'Expense not found');


    const { error, value } = expenseSchema.validate(req.body);
    if (error) return badRequest(res, error.message);


    db.expenses[idx] = { ...db.expenses[idx], ...value, updatedAt: new Date().toISOString() };
    return ok(res, db.expenses[idx]);
});


router.delete('/:id', (req, res) => {
    const idx = db.expenses.findIndex(e => e.id === req.params.id);
    if (idx === -1) return notFound(res, 'Expense not found');
    const removed = db.expenses.splice(idx, 1)[0];
    return ok(res, removed);
});


export default router;