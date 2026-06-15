import multer, { FileFilterCallback } from "multer";
import { Request } from "express";
import { BadRequestError } from "@/shared/errors";

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const storage = multer.memoryStorage();

function fileFilter(
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
): void {
  if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new BadRequestError("Invalid file type. Only JPEG, PNG, and WebP are allowed"));
  }
}

export const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter,
});
