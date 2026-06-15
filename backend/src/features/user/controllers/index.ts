import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { userService } from "../services";

export const userController = {
  async getProfile(req: Request, res: Response) {
    const userId = req.user!.id;
    const user = await userService.getProfile(userId);

    res.status(StatusCodes.OK).json({
      success: true,
      data: user,
    });
  },

  async updateProfile(req: Request, res: Response) {
    const userId = req.user!.id;
    const user = await userService.updateProfile(userId, req.body);

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Profile updated successfully",
      data: user,
    });
  },

  async changePassword(req: Request, res: Response) {
    const userId = req.user!.id;
    const { currentPassword, newPassword } = req.body;
    const result = await userService.changePassword(userId, currentPassword, newPassword);

    res.status(StatusCodes.OK).json({
      success: true,
      message: result.message,
    });
  },

  async addAddress(req: Request, res: Response) {
    const userId = req.user!.id;
    const addresses = await userService.addAddress(userId, req.body);

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Address added successfully",
      data: addresses,
    });
  },

  async updateAddress(req: Request, res: Response) {
    const userId = req.user!.id;
    const addressId = req.params.addressId as string;
    const addresses = await userService.updateAddress(userId, addressId, req.body);

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Address updated successfully",
      data: addresses,
    });
  },

  async removeAddress(req: Request, res: Response) {
    const userId = req.user!.id;
    const addressId = req.params.addressId as string;
    const addresses = await userService.removeAddress(userId, addressId);

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Address removed successfully",
      data: addresses,
    });
  },

  async setDefaultAddress(req: Request, res: Response) {
    const userId = req.user!.id;
    const addressId = req.params.addressId as string;
    const addresses = await userService.setDefaultAddress(userId, addressId);

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Default address updated successfully",
      data: addresses,
    });
  },
};
