export interface RazorpayOrderResponse {
  id: string;
  entity: string;
  amount: number;
  currency: string;
  status: string;
  receipt: string;
}

export interface StripePaymentIntentResponse {
  id: string;
  clientSecret: string;
  status: string;
  amount: number;
  currency: string;
}
