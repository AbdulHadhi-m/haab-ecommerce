import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { adminService } from "../services";

export const adminController = {
  async getDashboard(_req: Request, res: Response) {
    const data = await adminService.getDashboard();

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Dashboard data fetched successfully",
      data,
    });
  },

  async getCustomers(req: Request, res: Response) {
    const page = Math.max(1, parseInt(req.query.page as string, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string, 10) || 20));
    const search = req.query.search as string | undefined;

    const result = await adminService.getCustomers(page, limit, search);

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Customers fetched successfully",
      ...result,
    });
  },
};
