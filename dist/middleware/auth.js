// Path: server/src/middleware/auth.ts
// This file is used to handle authentication
import jwt from 'jsonwebtoken';
export const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing' });
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(403).json({ message: 'Token has expired' });
            }
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        return next(); // Explicitly return after calling next()
    });
    return; // Ensure the function always ends
};
// Example function to generate tokens
export const generateTokens = (username) => {
    // Generate JWT token
    const token = jwt.sign({ username }, process.env.JWT_SECRET_KEY, {
        expiresIn: '15m', // Short-lived access token
    });
    // Generate a refresh token (optional)
    const refreshToken = jwt.sign({ username }, process.env.JWT_SECRET_KEY, {
        expiresIn: '7d', // Longer-lived refresh token
    });
    return { token, refreshToken };
};
