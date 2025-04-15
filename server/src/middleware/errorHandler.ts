import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
    status?: number;
}

const errorHandler = (
    err: CustomError,
    _req: Request, // Prefix with an underscore to suppress the warning
    res: Response,
    _next: NextFunction // Prefix with an underscore to suppress the warning
) => {
    console.error('Error:', err.message);

    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(status).json({ error: message });
};

export default errorHandler;