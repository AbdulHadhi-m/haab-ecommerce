import { IBaseDocument } from "@/shared/interfaces";
import { IAddress } from "@/features/user/interfaces";

export interface IUser extends IBaseDocument {
  name: string;
  email: string;
  password: string;
  role: "customer" | "admin";
  isActive: boolean;
  lastLogin: Date | null;
  phone?: string;
  addresses?: IAddress[];
  comparePassword(candidatePassword: string): Promise<boolean>;
}
