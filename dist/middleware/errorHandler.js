const errorHandler = (err, _req, // Prefix with an underscore to suppress the warning
res, _next // Prefix with an underscore to suppress the warning
) => {
    console.error('Error:', err.message);
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({ error: message });
};
export default errorHandler;
