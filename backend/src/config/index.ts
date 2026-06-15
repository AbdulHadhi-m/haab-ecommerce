import { environment } from "./environment";

export const config = {
  port: environment.PORT,
  nodeEnv: environment.NODE_ENV,
  mongodbUri: environment.MONGODB_URI,
  corsOrigin: environment.CORS_ORIGIN,
  jwtAccessSecret: environment.JWT_ACCESS_SECRET,
  jwtRefreshSecret: environment.JWT_REFRESH_SECRET,
  accessTokenExpires: environment.ACCESS_TOKEN_EXPIRES,
  refreshTokenExpires: environment.REFRESH_TOKEN_EXPIRES,
  cloudinaryCloudName: environment.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey: environment.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: environment.CLOUDINARY_API_SECRET,
};
