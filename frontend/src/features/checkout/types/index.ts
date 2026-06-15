export interface ShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
}

export interface PaymentInfo {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

export type CheckoutStep = "shipping" | "payment" | "review" | "confirmation";
