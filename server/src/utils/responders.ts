import { Response } from 'express';


export function ok<T>(res: Response, data: T, status = 200) {
    return res.status(status).json({ ok: true, data });
}


export function badRequest(res: Response, message = 'Bad Request') {
    return res.status(400).json({ ok: false, error: message });
}


export function notFound(res: Response, message = 'Not Found') {
    return res.status(404).json({ ok: false, error: message });
}