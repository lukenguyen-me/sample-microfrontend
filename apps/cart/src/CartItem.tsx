import { formatCurrency } from "@repo/shared-utils";
import type React from "react";
import type { CartItem } from "./types";

interface CartItemProps {
  item: CartItem;
  onRemove?: () => void;
}

const CartItemRow: React.FC<CartItemProps> = ({ item, onRemove }) => {
  return (
    <div className="flex gap-4 items-center">
      <img
        src={item.image}
        alt={`${item.name} thumbnail`}
        className="w-16 h-16 rounded-md object-cover shrink-0 border border-base-200"
      />
      <div className="flex flex-col flex-1">
        <span className="text-sm font-medium text-base-content">
          {item.name}
        </span>
        <span className="text-xs text-base-content/60">{item.variant}</span>
        <div className="flex justify-between items-center mt-1">
          <span className="text-sm font-bold text-base-content">
            ${formatCurrency(item.price)}
          </span>
          <div className="flex items-center gap-2">
            <div className="badge badge-ghost text-xs">
              Qty: {item.quantity}
            </div>
            {onRemove && (
              <button
                type="button"
                onClick={onRemove}
                className="btn btn-ghost btn-xs btn-circle text-error hover:bg-error/10"
                aria-label={`Remove ${item.name}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-labelledby="remove-icon-title"
                >
                  <title id="remove-icon-title">Remove item</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 12H4"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemRow;
