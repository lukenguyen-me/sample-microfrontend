import { formatCurrency } from "@repo/shared-utils";
import type React from "react";
import type { CheckoutItem } from "../types";

interface OrderSummaryProps {
  items: CheckoutItem[];
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ items }) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const taxRate = 0.08;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  return (
    <div className="bg-base-200 rounded-lg p-4 flex flex-col gap-2">
      <div className="flex justify-between text-sm">
        <span className="text-base-content/60">Subtotal</span>
        <span className="text-base-content font-medium">
          ${formatCurrency(subtotal)}
        </span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-base-content/60">Tax (8%)</span>
        <span className="text-base-content font-medium">
          ${formatCurrency(tax)}
        </span>
      </div>
      <div className="h-px bg-base-300 my-1"></div>
      <div className="flex justify-between text-base">
        <span className="text-base-content font-bold">Total</span>
        <span className="text-primary font-bold text-lg">
          ${formatCurrency(total)}
        </span>
      </div>
    </div>
  );
};

export default OrderSummary;
