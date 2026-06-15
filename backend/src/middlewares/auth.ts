import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { verifyAccessToken } from "@/features/auth/utils/token";
import { authRepository } from "@/features/auth/repositories";
import { COOKIE_NAMES } from "@/features/auth/auth.constants";

export async function protect(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  let token: string | undefined;

  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    token = req.cookies[COOKIE_NAMES.ACCESS_TOKEN] as string | undefined;
  }

  if (!token) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: "Authentication required",
    });
    return;
  }

  try {
    const payload = verifyAccessToken(token);
    const user = await authRepository.findUserById(payload.userId);

    if (!user || !user.isActive) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "User not found or deactivated",
      });
      return;
    }

    req.user = { id: payload.userId, role: payload.role };
    next();
  } catch {
    res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
}

export function authorize(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(StatusCodes.FORBIDDEN).json({
        success: false,
        message: "Insufficient permissions",
      });
      return;
    }

    next();
  };
}
