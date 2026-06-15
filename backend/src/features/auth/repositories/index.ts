import { User } from "../auth.model";
import { IUser } from "../interfaces";
import { RegisterInput } from "../types";

export const authRepository = {
  async createUser(input: RegisterInput): Promise<IUser> {
    return User.create(input);
  },

  async findUserByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email });
  },

  async findUserById(id: string): Promise<IUser | null> {
    return User.findById(id);
  },

  async findUserByEmailWithPassword(email: string): Promise<IUser | null> {
    return User.findOne({ email }).select("+password");
  },

  async findUserByIdWithPassword(id: string): Promise<IUser | null> {
    return User.findById(id).select("+password");
  },

  async updateLastLogin(id: string): Promise<IUser | null> {
    return User.findByIdAndUpdate(id, { lastLogin: new Date() }, { new: true });
  },
};
