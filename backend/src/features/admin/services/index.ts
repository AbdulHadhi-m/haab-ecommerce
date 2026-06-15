import { Order } from "@/features/orders/order.model";
import { Product } from "@/features/products/product.model";
import { User } from "@/features/auth/auth.model";

export const adminService = {
  async getDashboard() {
    const [
      totalOrders,
      totalProducts,
      totalCustomers,
      revenueResult,
      recentOrders,
      latestCustomers,
      monthlySales,
      topProducts,
    ] = await Promise.all([
      Order.countDocuments(),
      Product.countDocuments({ isActive: true }),
      User.countDocuments({ role: "customer" }),
      Order.aggregate([
        { $match: { orderStatus: { $ne: "cancelled" } } },
        { $group: { _id: null, total: { $sum: "$pricing.totalAmount" } } },
      ]),
      Order.find()
        .populate("customer", "name email")
        .sort({ createdAt: -1 })
        .limit(5)
        .lean(),
      User.find({ role: "customer" })
        .sort({ createdAt: -1 })
        .limit(5)
        .lean(),
      Order.aggregate([
        { $match: { orderStatus: { $ne: "cancelled" } } },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
            total: { $sum: "$pricing.totalAmount" },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
        { $limit: 12 },
      ]),
      Order.aggregate([
        { $unwind: "$items" },
        { $match: { orderStatus: { $ne: "cancelled" } } },
        {
          $group: {
            _id: "$items.name",
            totalQuantity: { $sum: "$items.quantity" },
            totalRevenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } },
          },
        },
        { $sort: { totalQuantity: -1 } },
        { $limit: 5 },
      ]),
    ]);

    const totalRevenue = revenueResult[0]?.total ?? 0;

    const ordersTrend = monthlySales.map((m) => ({
      month: m._id,
      revenue: m.total,
      orders: m.count,
    }));

    return {
      stats: {
        totalRevenue,
        totalOrders,
        totalProducts,
        totalCustomers,
      },
      recentOrders,
      latestCustomers,
      ordersTrend,
      topProducts,
    };
  },

  async getCustomers(page = 1, limit = 20, search?: string) {
    const skip = (page - 1) * limit;
    const query: Record<string, unknown> = { role: "customer" };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const [customers, total] = await Promise.all([
      User.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      User.countDocuments(query),
    ]);

    const customersWithStats = await Promise.all(
      customers.map(async (c) => {
        const orderData = await Order.aggregate([
          { $match: { customer: c._id, orderStatus: { $ne: "cancelled" } } },
          {
            $group: {
              _id: null,
              totalOrders: { $sum: 1 },
              totalSpent: { $sum: "$pricing.totalAmount" },
            },
          },
        ]);
        return {
          _id: c._id,
          name: c.name,
          email: c.email,
          role: c.role,
          isActive: c.isActive,
          createdAt: c.createdAt,
          totalOrders: orderData[0]?.totalOrders ?? 0,
          totalSpent: orderData[0]?.totalSpent ?? 0,
        };
      }),
    );

    return {
      data: customersWithStats,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  },
};
