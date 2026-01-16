/// <reference types="react" />

import type { CartItem, CheckoutItem, Product } from "@repo/shared-store";

declare module "product_remote/ProductList" {
  import type { ComponentType } from "react";

  interface ProductListProps {
    title?: string;
    onAddToCart?: (product: Product) => void;
  }

  const ProductList: ComponentType<ProductListProps>;
  export default ProductList;
}

declare module "cart_remote/Cart" {
  import type { ComponentType } from "react";

  interface CartProps {
    title?: string;
    items?: CartItem[];
    isActive?: boolean;
    className?: string;
  }

  const Cart: ComponentType<CartProps>;
  export default Cart;
}

declare module "checkout_remote/Checkout" {
  import type { ComponentType } from "react";

  interface CheckoutProps {
    items?: CheckoutItem[];
    isActive?: boolean;
    onCancel?: () => void;
    onPlaceOrder?: (paymentMethod: string) => void;
    className?: string;
  }

  const Checkout: ComponentType<CheckoutProps>;
  export default Checkout;
}
