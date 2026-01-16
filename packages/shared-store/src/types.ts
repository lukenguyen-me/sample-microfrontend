// ============================================
// Core Entity Types
// ============================================

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export interface CartItem {
  id: number;
  name: string;
  variant: string;
  price: number;
  quantity: number;
  image: string;
  productId: number; // Reference to original product
}

// CheckoutItem is identical to CartItem for this use case
export type CheckoutItem = CartItem;

export type PaymentMethodType = "credit_card" | "bank_transfer";

// ============================================
// UI State Types
// ============================================

export type ActivePanel = "cart" | "checkout";

export interface PanelState {
  activePanel: ActivePanel;
  isCartActive: boolean;
  isCheckoutActive: boolean;
}

// ============================================
// Store State & Actions
// ============================================

export interface EcommerceState {
  // Cart state
  cartItems: CartItem[];

  // UI state
  activePanel: ActivePanel;

  // Checkout state
  checkoutComplete: boolean;
  lastOrderPaymentMethod: PaymentMethodType | null;
}

export interface EcommerceActions {
  // Cart actions
  addToCart: (product: Product, variant?: string) => void;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;

  // Panel navigation actions
  startCheckout: () => void;
  cancelCheckout: () => void;

  // Order actions
  placeOrder: (paymentMethod: PaymentMethodType) => void;
  resetOrder: () => void;
}

export interface EcommerceStore extends EcommerceState, EcommerceActions {}

// ============================================
// Component Props Types (Updated)
// ============================================

export interface ProductListProps {
  title?: string;
  // When using shared store, onAddToCart is optional
  // Falls back to store's addToCart if not provided
  onAddToCart?: (product: Product) => void;
}

export interface CartProps {
  title?: string;
  items?: CartItem[]; // Optional - falls back to store
  className?: string;
  isActive?: boolean; // For active state styling
  onCheckout?: () => void;
  onRemoveItem?: (itemId: number) => void;
  onUpdateQuantity?: (itemId: number, quantity: number) => void;
}

export interface CheckoutProps {
  items?: CheckoutItem[]; // Optional - falls back to store
  className?: string;
  isActive?: boolean; // For active state styling
  onCancel?: () => void;
  onPlaceOrder?: (paymentMethod: PaymentMethodType) => void;
}
