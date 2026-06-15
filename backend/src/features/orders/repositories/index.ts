import { Order } from "../order.model";
import type { IOrder } from "../interfaces";

export const orderRepository = {
  async create(input: IOrder): Promise<IOrder> {
    return Order.create(input);
  },

  async findByCustomer(customerId: string): Promise<IOrder[]> {
    const orders = await Order.find({ customer: customerId })
      .populate("items.productId", "name slug images")
      .sort({ createdAt: -1 })
      .select("-__v")
      .lean();
    return orders as unknown as IOrder[];
  },

  async findById(id: string): Promise<IOrder | null> {
    const order = await Order.findById(id)
      .populate("items.productId", "name slug images")
      .select("-__v")
      .lean();
    return order as unknown as IOrder | null;
  },

  async findByIdAndCustomer(id: string, customerId: string): Promise<IOrder | null> {
    const order = await Order.findOne({ _id: id, customer: customerId })
      .populate("items.productId", "name slug images")
      .select("-__v")
      .lean();
    return order as unknown as IOrder | null;
  },

  async findAll(): Promise<IOrder[]> {
    const orders = await Order.find()
      .populate("customer", "name email")
      .sort({ createdAt: -1 })
      .select("-__v")
      .lean();
    return orders as unknown as IOrder[];
  },

  async updateStatus(id: string, orderStatus: string): Promise<IOrder | null> {
    const order = await Order.findByIdAndUpdate(
      id,
      { orderStatus },
      { new: true, runValidators: true },
    )
      .populate("items.productId", "name slug images")
      .select("-__v")
      .lean();
    return order as unknown as IOrder | null;
  },

  async countByCustomer(customerId: string): Promise<number> {
    return Order.countDocuments({ customer: customerId });
  },
};
