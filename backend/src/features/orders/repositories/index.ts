import { Order } from "../order.model";
import { IOrder } from "../interfaces";

export const orderRepository = {
  async create(input: IOrder): Promise<IOrder> {
    return Order.create(input);
  },

  async findByCustomer(customerId: string): Promise<IOrder[]> {
    return Order.find({ customer: customerId })
      .populate("items.productId", "name slug images")
      .sort({ createdAt: -1 });
  },

  async findById(id: string): Promise<IOrder | null> {
    return Order.findById(id)
      .populate("items.productId", "name slug images");
  },

  async findByIdAndCustomer(id: string, customerId: string): Promise<IOrder | null> {
    return Order.findOne({ _id: id, customer: customerId })
      .populate("items.productId", "name slug images");
  },

  async findAll(): Promise<IOrder[]> {
    return Order.find()
      .populate("customer", "name email")
      .sort({ createdAt: -1 });
  },

  async updateStatus(id: string, orderStatus: string): Promise<IOrder | null> {
    return Order.findByIdAndUpdate(
      id,
      { orderStatus },
      { new: true, runValidators: true },
    ).populate("items.productId", "name slug images");
  },

  async countByCustomer(customerId: string): Promise<number> {
    return Order.countDocuments({ customer: customerId });
  },
};
