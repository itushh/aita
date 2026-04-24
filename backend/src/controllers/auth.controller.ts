import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { User } from "../models/User.model.js";
import { SavedAnalysis } from "../models/SavedAnalysis.model.js";
import type { AuthRequest } from "../middleware/auth.middleware.js";


/* ========================= Validation Schemas ========================= */

const registerSchema = z.object({
  name: z.string().min(1).max(25),
  email: z.string().email(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const updateProfileSchema = z.object({
  name: z.string().min(1).max(25),
  email: z.string().email(),
});

const changePasswordSchema = z.object({
  currentPassword: z.string().min(6),
  newPassword: z.string().min(6),
});


/* ========================= Generate JWT ================================ */

const generateToken = (userId: string): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("ENV VARIABLE NOT PROVIDED : JWT_SECRET");

  return jwt.sign({ id: userId }, secret, {
    expiresIn: "7d",
  });
};

/* ========================= Register Controller ========================= */

export const register = async (req: Request, res: Response) => {
  try {
    const validatedData = registerSchema.parse(req.body);

    const existingUser = await User.findOne({
      email: validatedData.email,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        errors: ["User already exists"],
      });
    }

    const user = await User.create(validatedData);

    const token = generateToken(user._id.toString());

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        errors: error.issues.map((issue) => issue.message),
      });
    }

    console.error("Register Error:", error);

    return res.status(500).json({
      success: false,
      errors: ["Internal Server error"],
    });
  }
};

/* ========================= Login Controller ============================ */

export const login = async (req: Request, res: Response) => {
  try {
    const validatedData = loginSchema.parse(req.body);

    const user = await User.findOne({
      email: validatedData.email,
    }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        errors: ["Invalid credentials"],
      });
    }

    const isMatch = await user.comparePassword(validatedData.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        errors: ["Invalid credentials"],
      });
    }

    const token = generateToken(user._id.toString());

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        errors: error.issues.map((issue) => issue.message),
      });
    }

    console.error("Login Error:", error);

    return res.status(500).json({
      success: false,
      errors: ["Internal Server Error"],
    });
  }
};

/* ========================= Logout Controller ========================== */

export const logout = async (_req: Request, res: Response) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout Error:", error);

    return res.status(500).json({
      success: false,
      errors: ["Internal Sever Error"],
    });
  }
};

/* ========================= Get Me Controller ========================== */

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        errors: ["User not found"],
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get Me Error:", error);
    return res.status(500).json({
      success: false,
      errors: ["Internal Server Error"],
    });
  }
};

/* ========================= Update Profile Controller ================== */

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const validatedData = updateProfileSchema.parse(req.body);

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        errors: ["User not found"],
      });
    }

    // Check if email is already taken by another user
    if (validatedData.email !== user.email) {
      const emailExists = await User.findOne({ email: validatedData.email });
      if (emailExists) {
        return res.status(400).json({
          success: false,
          errors: ["Email already in use"],
        });
      }
    }

    user.name = validatedData.name;
    user.email = validatedData.email;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        name: user.name,
        email: user.email,
        _id: user._id,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        errors: error.issues.map((issue) => issue.message),
      });
    }
    console.error("Update Profile Error:", error);
    return res.status(500).json({
      success: false,
      errors: ["Internal Server Error"],
    });
  }
};

/* ========================= Change Password Controller ================= */

export const changePassword = async (req: AuthRequest, res: Response) => {
  try {
    const validatedData = changePasswordSchema.parse(req.body);

    const user = await User.findById(req.user._id).select("+password");
    if (!user) {
      return res.status(404).json({
        success: false,
        errors: ["User not found"],
      });
    }

    const isMatch = await user.comparePassword(validatedData.currentPassword);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        errors: ["Incorrect current password"],
      });
    }

    user.password = validatedData.newPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        errors: error.issues.map((issue) => issue.message),
      });
    }
    console.error("Change Password Error:", error);
    return res.status(500).json({
      success: false,
      errors: ["Internal Server Error"],
    });
  }
};

/* ========================= Delete Account Controller ================== */

export const deleteAccount = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        errors: ["User not found"],
      });
    }

    // Delete all saved analyses of the user
    await SavedAnalysis.deleteMany({ user: user._id } as any);


    // Delete the user
    await User.findByIdAndDelete(user._id);

    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    console.error("Delete Account Error:", error);
    return res.status(500).json({
      success: false,
      errors: ["Internal Server Error"],
    });
  }
};

