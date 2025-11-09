import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'node:path';
import { seed } from './db.js';
import categories from './routes/categories.js';
import expenses from './routes/expenses.js';
import uploads from './routes/uploads.js';


const app = express();
const PORT = Number(process.env.PORT || 4000);
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';
const UPLOAD_DIR = process.env.UPLOAD_DIR || 'uploads';


app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: '5mb' }));
app.use(morgan('dev'));
app.use('/uploads', express.static(path.resolve(UPLOAD_DIR)));


seed();


app.get('/api/health', (_req, res) => res.json({ ok: true, status: 'healthy' }));
app.use('/api/categories', categories);
app.use('/api/expenses', expenses);
app.use('/api/uploads', uploads);


app.use((err: any, _req: any, res: any, _next: any) => {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Internal Server Error' });
});


app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));