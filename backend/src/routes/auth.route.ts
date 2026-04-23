import { Router } from "express";
import { login, logout, register, getMe, updateProfile, changePassword, deleteAccount } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.post('/login', login);
authRouter.post('/register', register);
authRouter.post('/logout', logout);

authRouter.get('/me', protect, getMe);
authRouter.put('/profile', protect, updateProfile);
authRouter.put('/change-password', protect, changePassword);
authRouter.delete('/account', protect, deleteAccount);

export { authRouter }