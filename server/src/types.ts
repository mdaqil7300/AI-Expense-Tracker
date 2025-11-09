export type Category = {
    id: string;
    name: string;
    color?: string; // optional UI color hex
    icon?: string; // optional icon name
    createdAt: string;
};


export type Expense = {
    id: string;
    date: string; // ISO string
    amount: number; // in smallest currency unit (paise) OR use number in base unit
    currency: string; // e.g., "INR"
    vendor?: string;
    notes?: string;
    categoryId?: string; // optional
    receiptUrl?: string; // uploaded image path
    createdAt: string;
    updatedAt: string;
};