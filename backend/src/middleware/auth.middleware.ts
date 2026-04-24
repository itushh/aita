import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User.model.js";

export interface AuthRequest extends Request {
    user?: any;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token;

    if (req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            errors: ["Not authorized to access this route"],
        });
    }

    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) throw new Error("ENV VARIABLE NOT PROVIDED : JWT_SECRET");

        const decoded = jwt.verify(token, secret) as { id: string };

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                success: false,
                errors: ["User not found"],
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            errors: ["Not authorized to access this route"],
        });
    }
};
