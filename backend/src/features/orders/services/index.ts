import { Types } from "mongoose";
import { orderRepository } from "../repositories";
import { NotFoundError, BadRequestError, ForbiddenError } from "@/shared/errors";
import { Product } from "@/features/products/product.model";
import { CreateOrderInput } from "../types";
import { IOrder } from "../interfaces";

function generateOrderNumber(): string {
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.floor(Math.random() * 100000)
    .toString()
    .padStart(5, "0");
  return `ORD-${dateStr}-${random}`;
}

function calcShippingFee(subtotal: number): number {
  return subtotal >= 100 ? 0 : 9.99;
}

function calcTax(subtotal: number): number {
  return Math.round(subtotal * 0.08 * 100) / 100;
}

export const orderService = {
  async create(customerId: string, input: CreateOrderInput) {
    const productIds = input.items.map((item) => item.productId);
    const products = await Product.find({ _id: { $in: productIds } });

    if (products.length !== input.items.length) {
      throw new BadRequestError("One or more products not found");
    }

    const productMap = new Map(products.map((p) => [p._id.toString(), p]));

    for (const item of input.items) {
      const product = productMap.get(item.productId);
      if (!product) {
        throw new BadRequestError(`Product ${item.name} not found`);
      }
      if (product.stock < item.quantity) {
        throw new BadRequestError(
          `Insufficient stock for "${product.name}". Available: ${product.stock}, requested: ${item.quantity}`,
        );
      }
    }

    const decremented: string[] = [];

    try {
      for (const item of input.items) {
        const result = await Product.updateOne(
          { _id: item.productId, stock: { $gte: item.quantity } },
          { $inc: { stock: -item.quantity } },
        );

        if (result.modifiedCount === 0) {
          throw new BadRequestError(
            `Failed to reserve stock for "${item.name}". It may have been purchased by another customer.`,
          );
        }

        decremented.push(item.productId);
      }

      const subtotal = input.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const shippingFee = calcShippingFee(subtotal);
      const tax = calcTax(subtotal);
      const totalAmount = Math.round((subtotal + shippingFee + tax) * 100) / 100;

      const orderNumber = generateOrderNumber();

      const orderData: IOrder = {
        customer: new Types.ObjectId(customerId),
        items: input.items.map((item) => ({
          productId: new Types.ObjectId(item.productId),
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
        })),
        shippingAddress: input.shippingAddress,
        pricing: { subtotal, shippingFee, tax, totalAmount },
        payment: {
          method: input.paymentMethod,
          status: input.paymentMethod === "cod" ? "pending" : "pending",
          transactionId: "",
        },
        orderStatus: "pending",
        orderNumber,
      } as IOrder;

      const order = await orderRepository.create(orderData);
      return order;
    } catch (error) {
      for (const productId of decremented) {
        const item = input.items.find((i) => i.productId === productId);
        if (item) {
          await Product.updateOne({ _id: productId }, { $inc: { stock: item.quantity } });
        }
      }
      throw error;
    }
  },

  async getMyOrders(customerId: string) {
    return orderRepository.findByCustomer(customerId);
  },

  async getById(id: string, customerId?: string, userRole?: string) {
    let order: IOrder | null;

    if (userRole === "admin") {
      order = await orderRepository.findById(id);
    } else if (customerId) {
      order = await orderRepository.findByIdAndCustomer(id, customerId);
    } else {
      order = null;
    }

    if (!order) {
      throw new NotFoundError("Order not found");
    }

    return order;
  },

  async updateStatus(id: string, orderStatus: string, userRole: string) {
    if (userRole !== "admin") {
      throw new ForbiddenError("Only admins can update order status");
    }

    const order = await orderRepository.updateStatus(id, orderStatus);
    if (!order) {
      throw new NotFoundError("Order not found");
    }

    return order;
  },

  async getAllOrders() {
    return orderRepository.findAll();
  },
};
