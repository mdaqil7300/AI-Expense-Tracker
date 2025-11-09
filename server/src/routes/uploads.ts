import { Router } from 'express';
import multer from 'multer';
import path from 'node:path';
import fs from 'node:fs';
import { ok, badRequest } from '../utils/responders.js';


const router = Router();


const uploadDir = process.env.UPLOAD_DIR || 'uploads';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });


const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) => {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, unique + path.extname(file.originalname));
    }
});


const upload = multer({ storage });


// POST /api/uploads/receipt (form-data: file)
router.post('/receipt', upload.single('file'), (req, res) => {
    if (!req.file) return badRequest(res, 'No file uploaded');
    const publicPath = `/uploads/${req.file.filename}`;
    return ok(res, { url: publicPath });
});


export default router;