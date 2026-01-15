import React from "react";
import CartItemRow from "./CartItem";
import { defaultCartItems } from "./data/mockCartData";
import type { CartProps } from "./types";

const Cart: React.FC<CartProps> = ({
  title = "Shopping Cart",
  items = defaultCartItems,
}) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body">
        <div className="flex items-center justify-between pb-4 border-b border-base-300">
          <h3 className="text-lg font-semibold text-base-content">{title}</h3>
          <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-full">
            {totalItems} {totalItems === 1 ? "Item" : "Items"}
          </span>
        </div>
        <div className="flex flex-col py-4 gap-4">
          {items.length > 0 ? (
            items.map((item) => <CartItemRow key={item.id} item={item} />)
          ) : (
            <div className="text-center py-8 text-base-content/60">
              Your cart is empty
            </div>
          )}
        </div>
        <div className="card-actions">
          <button className="btn btn-primary btn-block rounded-none">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
