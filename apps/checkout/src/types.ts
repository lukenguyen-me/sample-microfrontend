export interface CheckoutItem {
  id: number;
  name: string;
  variant: string;
  price: number;
  quantity: number;
  image: string;
  productId: number;
}

export type PaymentMethodType = "credit_card" | "bank_transfer";

export interface CheckoutProps {
  items?: CheckoutItem[];
  isActive?: boolean;
  onCancel?: () => void;
  onPlaceOrder?: (paymentMethod: PaymentMethodType) => void;
  className?: string;
}
