import express from 'express';
import { register, login, getProfile, updateProfile, changePassword, forgotPassword } from '../controllers/authController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const authRouter = express.Router();

// Public routes
authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/forgot-password', forgotPassword);

// Protected routes (require authentication)
authRouter.get('/profile', requireAuth, getProfile);
authRouter.put('/profile', requireAuth, updateProfile);
authRouter.put('/change-password', requireAuth, changePassword);

export default authRouter;
