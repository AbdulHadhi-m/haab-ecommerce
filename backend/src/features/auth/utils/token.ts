import jwt from "jsonwebtoken";
import { config } from "@/config";
import { TokenPayload } from "../types";

export function generateAccessToken(payload: TokenPayload): string {
  return jwt.sign(payload, config.jwtAccessSecret, {
    expiresIn: config.accessTokenExpires as jwt.SignOptions["expiresIn"],
  });
}

export function generateRefreshToken(payload: TokenPayload): string {
  return jwt.sign(payload, config.jwtRefreshSecret, {
    expiresIn: config.refreshTokenExpires as jwt.SignOptions["expiresIn"],
  });
}

export function verifyAccessToken(token: string): TokenPayload {
  return jwt.verify(token, config.jwtAccessSecret) as TokenPayload;
}

export function verifyRefreshToken(token: string): TokenPayload {
  return jwt.verify(token, config.jwtRefreshSecret) as TokenPayload;
}
