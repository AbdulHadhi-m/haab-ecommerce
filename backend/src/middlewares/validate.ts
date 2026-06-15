import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";
import { StatusCodes } from "http-status-codes";

export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
          success: false,
          message: "Validation failed",
          errors: error.flatten().fieldErrors,
        });
        return;
      }
      next(error);
    }
  };
}
