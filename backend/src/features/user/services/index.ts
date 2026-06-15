import { NotFoundError, BadRequestError } from "@/shared/errors";
import { userRepository } from "../repositories";
import { UpdateProfileInput } from "../types";
import { IAddress } from "../interfaces";

export const userService = {
  async getProfile(userId: string) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      addresses: user.addresses,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  },

  async updateProfile(userId: string, input: UpdateProfileInput) {
    const user = await userRepository.updateProfile(userId, input);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      addresses: user.addresses,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  },

  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await userRepository.findByIdWithPassword(userId);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      throw new BadRequestError("Current password is incorrect");
    }

    user.password = newPassword;
    await user.save();

    return { message: "Password updated successfully" };
  },

  async addAddress(userId: string, address: IAddress) {
    const user = await userRepository.addAddress(userId, address);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    return user.addresses;
  },

  async updateAddress(userId: string, addressId: string, address: Partial<IAddress>) {
    const user = await userRepository.updateAddress(userId, addressId, address);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    return user.addresses;
  },

  async removeAddress(userId: string, addressId: string) {
    const user = await userRepository.removeAddress(userId, addressId);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    return user.addresses;
  },

  async setDefaultAddress(userId: string, addressId: string) {
    const user = await userRepository.setDefaultAddress(userId, addressId);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    return user.addresses;
  },
};
