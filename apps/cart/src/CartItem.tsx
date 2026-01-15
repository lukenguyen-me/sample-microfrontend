import React from "react";
import type { CartItem } from "./types";

interface CartItemProps {
  item: CartItem;
}

const CartItemRow: React.FC<CartItemProps> = ({ item }) => {
  return (
    <div className="flex gap-4 items-center">
      <div
        className="w-16 h-16 rounded-md bg-cover bg-center shrink-0 border border-base-200"
        style={{ backgroundImage: `url(${item.image})` }}
        aria-label={`${item.name} thumbnail`}
      />
      <div className="flex flex-col flex-1">
        <span className="text-sm font-medium text-base-content">
          {item.name}
        </span>
        <span className="text-xs text-base-content/60">{item.variant}</span>
        <div className="flex justify-between items-center mt-1">
          <span className="text-sm font-bold text-base-content">
            ${item.price.toFixed(2)}
          </span>
          <div className="badge badge-ghost text-xs">Qty: {item.quantity}</div>
        </div>
      </div>
    </div>
  );
};

export default CartItemRow;
