import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { orderService } from "../services";

export const orderController = {
  async create(req: Request, res: Response) {
    const customerId = req.user!.id;
    const order = await orderService.create(customerId, req.body);

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Order placed successfully",
      data: order,
    });
  },

  async getMyOrders(req: Request, res: Response) {
    const customerId = req.user!.id;
    const orders = await orderService.getMyOrders(customerId);

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Orders fetched successfully",
      data: orders,
    });
  },

  async getById(req: Request, res: Response) {
    const id = req.params.id as string;
    const customerId = req.user?.id;
    const userRole = req.user?.role;
    const order = await orderService.getById(id, customerId, userRole);

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Order fetched successfully",
      data: order,
    });
  },

  async updateStatus(req: Request, res: Response) {
    const id = req.params.id as string;
    const { orderStatus } = req.body;
    const userRole = req.user!.role;
    const order = await orderService.updateStatus(id, orderStatus, userRole);

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Order status updated successfully",
      data: order,
    });
  },

  async getAllOrders(_req: Request, res: Response) {
    const orders = await orderService.getAllOrders();

    res.status(StatusCodes.OK).json({
      success: true,
      message: "All orders fetched successfully",
      data: orders,
    });
  },
};
