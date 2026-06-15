import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { authService } from "../services";
import { sendTokenResponse } from "../utils/send-token-response";
import { COOKIE_NAMES } from "../auth.constants";

export const authController = {
  async register(req: Request, res: Response) {
    const payload = await authService.register(req.body);

    sendTokenResponse(res, payload, "Registration successful", StatusCodes.CREATED);
  },

  async login(req: Request, res: Response) {
    const payload = await authService.login(req.body);

    sendTokenResponse(res, payload, "Login successful");
  },

  async logout(_req: Request, res: Response) {
    const cookieOptions = authService.clearCookieOptions();

    res
      .clearCookie(COOKIE_NAMES.ACCESS_TOKEN, cookieOptions)
      .clearCookie(COOKIE_NAMES.REFRESH_TOKEN, cookieOptions)
      .status(StatusCodes.OK)
      .json({ success: true, message: "Logout successful" });
  },

  async refreshToken(req: Request, res: Response) {
    const token = req.cookies[COOKIE_NAMES.REFRESH_TOKEN] as string | undefined;

    const payload = await authService.refreshToken(token ?? "");

    sendTokenResponse(res, payload, "Token refreshed successfully");
  },

  async getMe(req: Request, res: Response) {
    const userId = req.user!.id;
    const user = await authService.getCurrentUser(userId);

    res.status(StatusCodes.OK).json({
      success: true,
      data: user,
    });
  },
};
