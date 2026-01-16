import React, { useState } from "react";
import OrderSummary from "./components/OrderSummary";
import PaymentMethod from "./components/PaymentMethod";
import { defaultCheckoutItems } from "./data/mockCheckoutData";
import type { CheckoutProps, PaymentMethodType } from "./types";
import { useCheckout } from "@repo/shared-store";

const Checkout: React.FC<CheckoutProps> = ({
  items: propItems,
  isActive: propIsActive,
  onCancel,
  onPlaceOrder,
  className = "",
}) => {
  const checkout = useCheckout(defaultCheckoutItems);
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethodType>("credit_card");

  // Use prop values if provided, otherwise use store values
  const items = propItems ?? checkout.items;
  const isActive = propIsActive ?? checkout.isActive;

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else if (checkout.cancelCheckout) {
      checkout.cancelCheckout();
    } else {
      console.log("Checkout cancelled");
    }
  };

  const handlePlaceOrder = () => {
    if (onPlaceOrder) {
      onPlaceOrder(paymentMethod);
    } else if (checkout.placeOrder) {
      checkout.placeOrder(paymentMethod);
    } else {
      console.log("Order placed with payment method:", paymentMethod);
    }
  };

  return (
    <div
      className={`card bg-base-100 shadow-sm relative overflow-hidden ${!isActive ? "opacity-60" : ""} ${className}`}
    >
      {/* Active state accent line */}
      {isActive && (
        <div className="absolute top-0 left-0 w-full h-1 bg-secondary"></div>
      )}

      <div className="card-body">
        <h3 className="text-lg font-bold text-base-content pb-2 border-b border-base-300">
          Payment Information
        </h3>

        <div className="flex flex-col gap-6 pt-2">
          <OrderSummary items={items} />

          <PaymentMethod
            selected={paymentMethod}
            onSelect={isActive ? setPaymentMethod : undefined}
          />

          <div className="flex gap-3 mt-2">
            <button
              onClick={handleCancel}
              className="btn btn-soft flex-1 rounded-lg"
              disabled={!isActive}
            >
              Cancel
            </button>
            <button
              onClick={handlePlaceOrder}
              className="btn btn-primary flex-2 rounded-lg"
              disabled={!isActive}
            >
              Place Order
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
