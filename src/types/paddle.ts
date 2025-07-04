export interface PaddlePrice {
  id: string;
  amount: string;
  currency: string;
  formatted: string;
}

export interface PaddleCheckoutOptions {
  priceId: string;
  email?: string;
  customData?: Record<string, any>;
}

export interface PaddleSubscription {
  id: string;
  status: 'active' | 'canceled' | 'paused' | 'past_due';
  priceId: string;
  productId: string;
  customerId: string;
  createdAt: string;
  updatedAt: string;
  scheduledChange?: string;
}

export interface PaddleCustomer {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}