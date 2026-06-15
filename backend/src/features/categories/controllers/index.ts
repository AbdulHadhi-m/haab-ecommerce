import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { categoryService } from "../services";

export const categoryController = {
  async create(req: Request, res: Response) {
    const category = await categoryService.create(req.body);

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  },

  async getAll(req: Request, res: Response) {
    const isActive = req.query.isActive !== undefined
      ? req.query.isActive === "true"
      : undefined;

    const categories = await categoryService.getAll(isActive);

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Categories fetched successfully",
      data: categories,
    });
  },

  async getBySlug(req: Request, res: Response) {
    const slug = req.params.slug as string;
    const category = await categoryService.getBySlug(slug);

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Category fetched successfully",
      data: category,
    });
  },

  async update(req: Request, res: Response) {
    const id = req.params.id as string;
    const category = await categoryService.update(id, req.body);

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Category updated successfully",
      data: category,
    });
  },

  async delete(req: Request, res: Response) {
    const id = req.params.id as string;
    await categoryService.delete(id);

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Category deleted successfully",
    });
  },
};
