import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../shared/errors";
import { config } from "../config";

interface ErrorResponse {
  success: false;
  message: string;
  stack?: string;
  errors?: Record<string, string[]>;
}

function handleMongooseValidationError(err: mongoose.Error.ValidationError): AppError {
  const messages = Object.values(err.errors).map((e) => e.message);
  return new AppError(messages.join("; "), StatusCodes.BAD_REQUEST);
}

function handleMongooseCastError(err: mongoose.Error.CastError): AppError {
  return new AppError(`Invalid ${err.path}: ${err.value}`, StatusCodes.BAD_REQUEST);
}

function handleMongooseDuplicateKey(err: mongoose.Error & { code?: number; keyValue?: Record<string, unknown> }): AppError {
  const field = Object.keys(err.keyValue ?? {}).join(", ");
  return new AppError(`Duplicate value for: ${field}`, StatusCodes.CONFLICT);
}

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  let error: AppError;

  if (err instanceof AppError) {
    error = err;
  } else if (err instanceof mongoose.Error.ValidationError) {
    error = handleMongooseValidationError(err);
  } else if (err instanceof mongoose.Error.CastError) {
    error = handleMongooseCastError(err);
  } else if ((err as mongoose.Error & { code?: number }).code === 11000) {
    error = handleMongooseDuplicateKey(err);
  } else {
    error = new AppError(
      config.nodeEnv === "production" ? "Internal server error" : err.message,
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }

  const body: ErrorResponse = {
    success: false,
    message: error.message,
  };

  if (config.nodeEnv === "development") {
    body.stack = err.stack;
  }

  res.status(error.statusCode).json(body);
}
