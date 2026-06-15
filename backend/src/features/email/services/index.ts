import nodemailer from "nodemailer";
import { config } from "@/config";

const transporter = nodemailer.createTransport({
  host: config.smtpHost,
  port: config.smtpPort,
  secure: config.smtpPort === 465,
  auth: {
    user: config.smtpUser,
    pass: config.smtpPass,
  },
});

export const emailService = {
  async sendOrderConfirmation(
    to: string,
    orderNumber: string,
    items: Array<{ name: string; quantity: number; price: number }>,
    total: number,
  ): Promise<void> {
    const itemsHtml = items
      .map(
        (item) =>
          `<tr><td>${item.name}</td><td>${item.quantity}</td><td>$${item.price.toFixed(2)}</td></tr>`,
      )
      .join("");

    await transporter.sendMail({
      from: `"HAAB" <${config.smtpFrom}>`,
      to,
      subject: `Order Confirmed - ${orderNumber}`,
      html: `
        <h1>Thank you for your order!</h1>
        <p>Your order <strong>${orderNumber}</strong> has been placed successfully.</p>
        <table border="1" cellpadding="8" style="border-collapse:collapse;width:100%;margin:20px 0;">
          <tr><th>Item</th><th>Qty</th><th>Price</th></tr>
          ${itemsHtml}
        </table>
        <p><strong>Total: $${total.toFixed(2)}</strong></p>
        <p>We'll notify you when your order ships.</p>
      `,
    });
  },

  async sendOrderStatusUpdate(
    to: string,
    orderNumber: string,
    newStatus: string,
  ): Promise<void> {
    await transporter.sendMail({
      from: `"HAAB" <${config.smtpFrom}>`,
      to,
      subject: `Order Update - ${orderNumber}`,
      html: `
        <h1>Order Status Updated</h1>
        <p>Your order <strong>${orderNumber}</strong> is now: <strong>${newStatus.toUpperCase()}</strong></p>
        <p>Track your orders at your account dashboard.</p>
      `,
    });
  },
};
