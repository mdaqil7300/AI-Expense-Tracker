import Joi from 'joi';


export const categorySchema = Joi.object({
    name: Joi.string().min(1).max(50).required(),
    color: Joi.string().optional(),
    icon: Joi.string().optional()
});


export const expenseSchema = Joi.object({
    date: Joi.string().isoDate().required(),
    amount: Joi.number().precision(2).positive().required(),
    currency: Joi.string().length(3).uppercase().default('INR'),
    vendor: Joi.string().allow('', null),
    notes: Joi.string().allow('', null),
    categoryId: Joi.string().allow('', null)
});