import { authRepository } from "../repositories";
import {
  BadRequestError,
  UnauthorizedError,
} from "@/shared/errors";
import {
  verifyRefreshToken,
} from "../utils/token";
import { RegisterInput, LoginInput } from "../types";

export const authService = {
  async register(input: RegisterInput) {
    const existing = await authRepository.findUserByEmail(input.email);
    if (existing) {
      throw new BadRequestError("Email already registered");
    }

    const user = await authRepository.createUser(input);

    return {
      userId: user._id.toString(),
      role: user.role,
    };
  },

  async login(input: LoginInput) {
    const user = await authRepository.findUserByEmailWithPassword(input.email);
    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }

    if (!user.isActive) {
      throw new UnauthorizedError("Account has been deactivated");
    }

    const isMatch = await user.comparePassword(input.password);
    if (!isMatch) {
      throw new UnauthorizedError("Invalid email or password");
    }

    await authRepository.updateLastLogin(user._id.toString());

    return {
      userId: user._id.toString(),
      role: user.role,
    };
  },

  async refreshToken(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedError("Refresh token is required");
    }

    let payload;
    try {
      payload = verifyRefreshToken(refreshToken);
    } catch {
      throw new UnauthorizedError("Invalid or expired refresh token");
    }

    const user = await authRepository.findUserById(payload.userId);
    if (!user || !user.isActive) {
      throw new UnauthorizedError("User not found or deactivated");
    }

    return {
      userId: user._id.toString(),
      role: user.role,
    };
  },

  async getCurrentUser(userId: string) {
    const user = await authRepository.findUserById(userId);
    if (!user) {
      throw new BadRequestError("User not found");
    }

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      lastLogin: user.lastLogin,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  },

  clearCookieOptions() {
    return {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" as const : "lax" as const,
      path: "/",
    };
  },
};
