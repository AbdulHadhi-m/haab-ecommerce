export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}
