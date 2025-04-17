// Path: server/src/controllers/user-controller.ts
// This file is used to handle user-related requests
import { User } from '../models/user.js';
// Validate password strength
const isPasswordStrong = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};
// GET /Users
export const getAllUsers = async (_req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] }
        });
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// GET /Users/:id
export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id, {
            attributes: { exclude: ['password'] }
        });
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// POST /Users
export const createUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!isPasswordStrong(password)) {
            return res.status(400).json({
                message: 'Password must be at least 8 characters long and include letters, numbers, and special characters.',
            });
        }
        const newUser = await User.create({ username, password });
        return res.status(201).json(newUser);
    }
    catch (error) {
        return res.status(400).json({ message: error.message }); // Add a return statement here
    }
};
// PUT /Users/:id
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;
    try {
        const user = await User.findByPk(id);
        if (user) {
            if (password && !isPasswordStrong(password)) {
                return res.status(400).json({
                    message: 'Password must be at least 8 characters long and include letters, numbers, and special characters.',
                });
            }
            user.username = username;
            if (password) {
                user.password = password;
            }
            await user.save();
            return res.json(user);
        }
        else {
            return res.status(404).json({ message: 'User not found' }); // Add a return statement here
        }
    }
    catch (error) {
        return res.status(400).json({ message: error.message }); // Add a return statement here
    }
};
// DELETE /Users/:id
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (user) {
            await user.destroy();
            res.json({ message: 'User deleted' });
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
