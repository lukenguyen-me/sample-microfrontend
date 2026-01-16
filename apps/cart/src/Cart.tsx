import { useCart } from "@repo/shared-store";
import type React from "react";
import CartItemRow from "./CartItem";
import { defaultCartItems } from "./data/mockCartData";
import type { CartProps } from "./types";

const Cart: React.FC<CartProps> = ({
  title = "Shopping Cart",
  items: propItems,
  isActive: propIsActive,
  className = "",
}) => {
  const cart = useCart(defaultCartItems);

  // Use prop values if provided, otherwise use store values
  const items = propItems ?? cart.items;
  const isActive = propIsActive ?? cart.isActive;
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    if (cart.startCheckout) {
      cart.startCheckout();
    }
  };

  const handleRemoveItem = (itemId: number) => {
    if (cart.removeFromCart) {
      cart.removeFromCart(itemId);
    }
  };

  return (
    <div
      className={`card bg-base-100 shadow-sm relative overflow-hidden ${className}`}
    >
      {/* Active state accent line */}
      {isActive && (
        <div className="absolute top-0 left-0 w-full h-1 bg-secondary"></div>
      )}

      <div className="card-body">
        <div className="flex items-center justify-between pb-4 border-b border-base-300">
          <h3 className="text-lg font-semibold text-base-content">{title}</h3>
          <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-full">
            {totalItems} {totalItems === 1 ? "Item" : "Items"}
          </span>
        </div>

        <div className="flex flex-col py-4 gap-4">
          {items.length > 0 ? (
            items.map((item) => (
              <CartItemRow
                key={item.id}
                item={item}
                onRemove={
                  isActive ? () => handleRemoveItem(item.id) : undefined
                }
              />
            ))
          ) : (
            <div className="text-center py-8 text-base-content/60">
              Your cart is empty
            </div>
          )}
        </div>

        {/* Always show checkout button, disabled when cart is empty */}
        <div className="card-actions">
          <button
            type="button"
            className="btn btn-primary btn-block rounded-none"
            onClick={handleCheckout}
            disabled={!isActive || items.length === 0}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
