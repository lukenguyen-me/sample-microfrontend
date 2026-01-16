import React from "react";
import type { PaymentMethodType } from "../types";

interface PaymentMethodProps {
  selected: PaymentMethodType;
  onSelect?: (method: PaymentMethodType) => void;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  selected,
  onSelect,
}) => {
  const isDisabled = !onSelect;
  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-semibold text-base-content">
        Select Payment Method
      </label>

      <label
        className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
          selected === "credit_card"
            ? "border-primary bg-primary/5"
            : "border-base-300 hover:border-base-content/40"
        } ${isDisabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
      >
        <div className="flex items-center gap-3">
          <input
            type="radio"
            name="payment"
            className="radio radio-primary"
            checked={selected === "credit_card"}
            onChange={() => onSelect?.("credit_card")}
            disabled={isDisabled}
          />
          <span className="text-sm font-medium text-base-content">
            Credit Card
          </span>
        </div>
        <div className="flex gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-base-content/60"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
        </div>
      </label>

      <label
        className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
          selected === "bank_transfer"
            ? "border-primary bg-primary/5"
            : "border-base-300 hover:border-base-content/40"
        } ${isDisabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
      >
        <div className="flex items-center gap-3">
          <input
            type="radio"
            name="payment"
            className="radio radio-primary"
            checked={selected === "bank_transfer"}
            onChange={() => onSelect?.("bank_transfer")}
            disabled={isDisabled}
          />
          <span className="text-sm font-medium text-base-content">
            Bank Transfer
          </span>
        </div>
        <div className="flex gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-base-content/60"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
            />
          </svg>
        </div>
      </label>
    </div>
  );
};

export default PaymentMethod;
