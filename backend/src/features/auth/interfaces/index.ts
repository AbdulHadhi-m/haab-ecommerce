import { IBaseDocument } from "@/shared/interfaces";

export interface IUser extends IBaseDocument {
  name: string;
  email: string;
  password: string;
  role: "customer" | "admin";
  isActive: boolean;
  lastLogin: Date | null;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
