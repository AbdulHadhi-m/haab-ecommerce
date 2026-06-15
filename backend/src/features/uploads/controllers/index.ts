import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { uploadService } from "../services";

export const uploadController = {
  async uploadSingle(req: Request, res: Response) {
    const file = req.file as Express.Multer.File;
    const result = await uploadService.uploadSingleImage(file);

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Image uploaded successfully",
      data: result,
    });
  },

  async uploadMultiple(req: Request, res: Response) {
    const files = req.files as Express.Multer.File[];
    const results = await uploadService.uploadMultipleImages(files);

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Images uploaded successfully",
      data: results,
    });
  },

  async deleteImage(req: Request, res: Response) {
    const publicId = req.params.publicId as string;
    const result = await uploadService.deleteImage(publicId);

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Image deleted successfully",
      data: result,
    });
  },
};
