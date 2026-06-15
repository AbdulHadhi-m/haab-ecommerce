import streamifier from "streamifier";
import { cloudinary } from "@/config/cloudinary";
import { BadRequestError } from "@/shared/errors";
import { UploadResult, DeleteResult } from "../types";

const UPLOAD_FOLDER = "haab-ecommerce";

function uploadFromBuffer(buffer: Buffer): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: UPLOAD_FOLDER,
        resource_type: "image",
        transformation: [{ quality: "auto", fetch_format: "auto" }],
      },
      (error, result) => {
        if (error || !result) {
          reject(new BadRequestError(error?.message ?? "Image upload failed"));
          return;
        }
        resolve({ url: result.secure_url, publicId: result.public_id });
      },
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
}

export const uploadService = {
  async uploadSingleImage(file: Express.Multer.File): Promise<UploadResult> {
    if (!file) {
      throw new BadRequestError("No file provided");
    }

    return uploadFromBuffer(file.buffer);
  },

  async uploadMultipleImages(files: Express.Multer.File[]): Promise<UploadResult[]> {
    if (!files || files.length === 0) {
      throw new BadRequestError("No files provided");
    }

    const results = await Promise.all(files.map((file) => uploadFromBuffer(file.buffer)));
    return results;
  },

  async deleteImage(publicId: string): Promise<DeleteResult> {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      return { success: result.result === "ok", publicId };
    } catch {
      throw new BadRequestError("Failed to delete image from Cloudinary");
    }
  },

  async deleteMultipleImages(publicIds: string[]): Promise<DeleteResult[]> {
    const results = await Promise.all(publicIds.map((id) => this.deleteImage(id)));
    return results;
  },
};
