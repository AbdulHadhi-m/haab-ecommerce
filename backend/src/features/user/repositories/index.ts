import { User } from "@/features/auth/auth.model";
import { IUser } from "@/features/auth/interfaces";
import { UpdateProfileInput } from "../types";
import { IAddress } from "../interfaces";

export const userRepository = {
  async findById(id: string): Promise<IUser | null> {
    return User.findById(id);
  },
  async findByIdWithPassword(id: string): Promise<IUser | null> {
    return User.findById(id).select("+password");
  },
  async updateProfile(id: string, input: UpdateProfileInput): Promise<IUser | null> {
    return User.findByIdAndUpdate(id, { $set: input }, { new: true, runValidators: true });
  },
  async updatePassword(id: string, password: string): Promise<IUser | null> {
    return User.findByIdAndUpdate(id, { password }, { new: true });
  },
  async addAddress(id: string, address: IAddress): Promise<IUser | null> {
    return User.findByIdAndUpdate(id, { $push: { addresses: address } }, { new: true, runValidators: true });
  },
  async updateAddress(id: string, addressId: string, address: Partial<IAddress>): Promise<IUser | null> {
    return User.findOneAndUpdate(
      { _id: id, "addresses._id": addressId },
      { $set: { "addresses.$": { ...address, _id: addressId } } },
      { new: true, runValidators: true },
    );
  },
  async removeAddress(id: string, addressId: string): Promise<IUser | null> {
    return User.findByIdAndUpdate(id, { $pull: { addresses: { _id: addressId } } }, { new: true });
  },
  async setDefaultAddress(id: string, addressId: string): Promise<IUser | null> {
    await User.updateOne({ _id: id }, { $set: { "addresses.$[].isDefault": false } });
    return User.findOneAndUpdate(
      { _id: id, "addresses._id": addressId },
      { $set: { "addresses.$.isDefault": true } },
      { new: true },
    );
  },
};
