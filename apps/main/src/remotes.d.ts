/// <reference types="react" />

declare module "product_remote/ProductList" {
  import { ComponentType } from "react";

  interface ProductListProps {
    title?: string;
    onAddToCart?: (product: any) => void;
  }

  const ProductList: ComponentType<ProductListProps>;
  export default ProductList;
}

declare module "cart_remote/Cart" {
  import { ComponentType } from "react";

  interface CartProps {
    title?: string;
    items?: any[];
    isActive?: boolean;
    className?: string;
  }

  const Cart: ComponentType<CartProps>;
  export default Cart;
}

declare module "checkout_remote/Checkout" {
  import { ComponentType } from "react";

  interface CheckoutProps {
    items?: any[];
    isActive?: boolean;
    onCancel?: () => void;
    onPlaceOrder?: (paymentMethod: string) => void;
    className?: string;
  }

  const Checkout: ComponentType<CheckoutProps>;
  export default Checkout;
}
