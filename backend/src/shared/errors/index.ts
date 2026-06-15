import { StatusCodes } from "http-status-codes";

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = "Resource not found") {
    super(message, StatusCodes.NOT_FOUND);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string = "Bad request") {
    super(message, StatusCodes.BAD_REQUEST);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = "Unauthorized") {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = "Forbidden") {
    super(message, StatusCodes.FORBIDDEN);
  }
}
