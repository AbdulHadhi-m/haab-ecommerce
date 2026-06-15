export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface TokenPayload {
  userId: string;
  role: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthenticatedRequest {
  userId: string;
  role: string;
}
