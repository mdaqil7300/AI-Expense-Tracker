import { Router } from 'express';
import { nanoid } from 'nanoid';
import { db } from '../db.js';
import { categorySchema } from '../validators.js';
import { ok, badRequest, notFound } from '../utils/responders.js';


const router = Router();


router.get('/', (_req, res) => ok(res, db.categories));


router.post('/', (req, res) => {
    const { error, value } = categorySchema.validate(req.body);
    if (error) return badRequest(res, error.message);


    const now = new Date().toISOString();
    const category = { id: nanoid(), createdAt: now, ...value };
    db.categories.push(category);
    return ok(res, category, 201);
});


router.put('/:id', (req, res) => {
    const { id } = req.params;
    const idx = db.categories.findIndex(c => c.id === id);
    if (idx === -1) return notFound(res, 'Category not found');


    const { error, value } = categorySchema.validate(req.body);
    if (error) return badRequest(res, error.message);


    db.categories[idx] = { ...db.categories[idx], ...value };
    return ok(res, db.categories[idx]);
});


router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const idx = db.categories.findIndex(c => c.id === id);
    if (idx === -1) return notFound(res, 'Category not found');


    const removed = db.categories.splice(idx, 1)[0];
    // also clear this category from expenses
    db.expenses = db.expenses.map(e => (e.categoryId === id ? { ...e, categoryId: undefined } : e));
    return ok(res, removed);
});


export default router;