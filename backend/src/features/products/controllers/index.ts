import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { productService } from "../services";

export const productController = {
  async create(req: Request, res: Response) {
    const product = await productService.create(req.body);

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  },

  async getAll(req: Request, res: Response) {
    const result = await productService.getAll(req.query as Record<string, string>);

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Products fetched successfully",
      data: result.data,
      meta: result.meta,
    });
  },

  async getBySlug(req: Request, res: Response) {
    const slug = req.params.slug as string;
    const product = await productService.getBySlug(slug);

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Product fetched successfully",
      data: product,
    });
  },

  async update(req: Request, res: Response) {
    const id = req.params.id as string;
    const product = await productService.update(id, req.body);

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  },

  async delete(req: Request, res: Response) {
    const id = req.params.id as string;
    await productService.delete(id);

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Product deleted successfully",
    });
  },
};
