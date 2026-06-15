import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { generateAccessToken, generateRefreshToken } from "./token";
import { COOKIE_NAMES, COOKIE_OPTIONS } from "../auth.constants";
import { config } from "@/config";

interface UserPayload {
  userId: string;
  role: string;
}

export function sendTokenResponse(
  res: Response,
  user: UserPayload,
  message: string,
  statusCode: number = StatusCodes.OK,
): void {
  const accessToken = generateAccessToken({ userId: user.userId, role: user.role });
  const refreshToken = generateRefreshToken({ userId: user.userId, role: user.role });

  const accessMaxAge = ms(config.accessTokenExpires);
  const refreshMaxAge = ms(config.refreshTokenExpires);

  res
    .cookie(COOKIE_NAMES.ACCESS_TOKEN, accessToken, {
      ...COOKIE_OPTIONS,
      maxAge: accessMaxAge,
    })
    .cookie(COOKIE_NAMES.REFRESH_TOKEN, refreshToken, {
      ...COOKIE_OPTIONS,
      maxAge: refreshMaxAge,
    })
    .status(statusCode)
    .json({
      success: true,
      message,
      data: {
        accessToken,
        refreshToken,
        user: { id: user.userId, role: user.role },
      },
    });
}

function ms(expression: string): number {
  const match = expression.match(/^(\d+)\s*(s|m|h|d)$/);
  if (!match) return 15 * 60 * 1000;

  const value = parseInt(match[1]!, 10);
  const unit = match[2];

  switch (unit) {
    case "s": return value * 1000;
    case "m": return value * 60 * 1000;
    case "h": return value * 60 * 60 * 1000;
    case "d": return value * 24 * 60 * 60 * 1000;
    default: return 15 * 60 * 1000;
  }
}
