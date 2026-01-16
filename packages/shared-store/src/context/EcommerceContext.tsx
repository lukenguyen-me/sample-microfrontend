import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import type {
  EcommerceState,
  EcommerceStore,
  CartItem,
  Product,
  PaymentMethodType,
  ActivePanel,
} from "../types";

// ============================================
// Initial State
// ============================================

const initialState: EcommerceState = {
  cartItems: [],
  activePanel: "cart",
  checkoutComplete: false,
  lastOrderPaymentMethod: null,
};

// ============================================
// Action Types
// ============================================

type EcommerceAction =
  | { type: "ADD_TO_CART"; payload: { product: Product; variant?: string } }
  | { type: "REMOVE_FROM_CART"; payload: { itemId: number } }
  | { type: "UPDATE_QUANTITY"; payload: { itemId: number; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "SET_ACTIVE_PANEL"; payload: { panel: ActivePanel } }
  | { type: "PLACE_ORDER"; payload: { paymentMethod: PaymentMethodType } }
  | { type: "RESET_ORDER" };

// ============================================
// Reducer
// ============================================

function ecommerceReducer(
  state: EcommerceState,
  action: EcommerceAction
): EcommerceState {
  switch (action.type) {
    case "ADD_TO_CART": {
      const { product, variant = "Default" } = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.productId === product.id && item.variant === variant
      );

      if (existingItem) {
        // Increment quantity if item already exists
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === existingItem.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      // Add new item
      const newItem: CartItem = {
        id: Date.now(), // Unique cart item ID
        productId: product.id,
        name: product.name,
        variant,
        price: product.price,
        quantity: 1,
        image: product.image,
      };

      return {
        ...state,
        cartItems: [...state.cartItems, newItem],
      };
    }

    case "REMOVE_FROM_CART": {
      const { itemId } = action.payload;
      const item = state.cartItems.find((i) => i.id === itemId);

      if (item && item.quantity > 1) {
        // Decrement quantity if more than 1
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
          ),
        };
      }

      // Remove item completely if quantity is 1
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== itemId),
      };
    }

    case "UPDATE_QUANTITY": {
      const { itemId, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          cartItems: state.cartItems.filter((item) => item.id !== itemId),
        };
      }
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        ),
      };
    }

    case "CLEAR_CART":
      return {
        ...state,
        cartItems: [],
      };

    case "SET_ACTIVE_PANEL":
      return {
        ...state,
        activePanel: action.payload.panel,
      };

    case "PLACE_ORDER":
      return {
        ...state,
        cartItems: [],
        activePanel: "cart",
        checkoutComplete: true,
        lastOrderPaymentMethod: action.payload.paymentMethod,
      };

    case "RESET_ORDER":
      return {
        ...state,
        checkoutComplete: false,
        lastOrderPaymentMethod: null,
      };

    default:
      return state;
  }
}

// ============================================
// Context
// ============================================

const EcommerceContext = createContext<EcommerceStore | null>(null);

// ============================================
// Provider Component
// ============================================

interface EcommerceProviderProps {
  children: ReactNode;
  initialCartItems?: CartItem[];
}

export function EcommerceProvider({
  children,
  initialCartItems,
}: EcommerceProviderProps) {
  const [state, dispatch] = useReducer(ecommerceReducer, {
    ...initialState,
    cartItems: initialCartItems ?? initialState.cartItems,
  });

  // Action creators
  const addToCart = useCallback((product: Product, variant?: string) => {
    dispatch({ type: "ADD_TO_CART", payload: { product, variant } });
  }, []);

  const removeFromCart = useCallback((itemId: number) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { itemId } });
  }, []);

  const updateQuantity = useCallback((itemId: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { itemId, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  const startCheckout = useCallback(() => {
    dispatch({ type: "SET_ACTIVE_PANEL", payload: { panel: "checkout" } });
  }, []);

  const cancelCheckout = useCallback(() => {
    dispatch({ type: "SET_ACTIVE_PANEL", payload: { panel: "cart" } });
  }, []);

  const placeOrder = useCallback((paymentMethod: PaymentMethodType) => {
    dispatch({ type: "PLACE_ORDER", payload: { paymentMethod } });
  }, []);

  const resetOrder = useCallback(() => {
    dispatch({ type: "RESET_ORDER" });
  }, []);

  // Memoized store value
  const store = useMemo<EcommerceStore>(
    () => ({
      ...state,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      startCheckout,
      cancelCheckout,
      placeOrder,
      resetOrder,
    }),
    [
      state,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      startCheckout,
      cancelCheckout,
      placeOrder,
      resetOrder,
    ]
  );

  return (
    <EcommerceContext.Provider value={store}>
      {children}
    </EcommerceContext.Provider>
  );
}

// ============================================
// Hook to consume context
// ============================================

export function useEcommerceContext(): EcommerceStore | null {
  return useContext(EcommerceContext);
}

// ============================================
// Main hook for components
// ============================================

export function useEcommerceStore(): EcommerceStore | null {
  return useEcommerceContext();
}

// ============================================
// Cart-specific hook
// ============================================

export function useCart(fallbackItems?: CartItem[]) {
  const store = useEcommerceStore();

  return useMemo(() => {
    const items = store?.cartItems ?? fallbackItems ?? [];
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    return {
      items,
      totalItems,
      totalPrice,
      isEmpty: items.length === 0,
      isActive: store?.activePanel === "cart",
      addToCart: store?.addToCart ?? null,
      removeFromCart: store?.removeFromCart ?? null,
      updateQuantity: store?.updateQuantity ?? null,
      startCheckout: store?.startCheckout ?? null,
    };
  }, [store, fallbackItems]);
}

// ============================================
// Checkout-specific hook
// ============================================

export function useCheckout(fallbackItems?: CartItem[]) {
  const store = useEcommerceStore();

  return useMemo(() => {
    const items = store?.cartItems ?? fallbackItems ?? [];

    return {
      items,
      isActive: store?.activePanel === "checkout",
      checkoutComplete: store?.checkoutComplete ?? false,
      lastPaymentMethod: store?.lastOrderPaymentMethod ?? null,
      cancelCheckout: store?.cancelCheckout ?? null,
      placeOrder: store?.placeOrder ?? null,
      resetOrder: store?.resetOrder ?? null,
    };
  }, [store, fallbackItems]);
}

// ============================================
// Export context for advanced usage
// ============================================

export { EcommerceContext };
