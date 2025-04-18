// Path: server/src/routes/index.ts
// This file is used to define the routes for the server
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';
// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();
router.use('/auth', authRoutes);
router.use('/api', authenticateToken, apiRoutes);
export default router;
const app = express();
// Serve static files from the client build directory
app.use(express.static(path.join(__dirname, '../../client/dist')));
// Fallback to index.html for SPA routing
app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
