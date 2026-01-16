import React, { useState, useEffect } from "react";
import { EcommerceProvider, useEcommerceStore } from "@repo/shared-store";

// Inner component that uses the store
const AppContent: React.FC = () => {
  const [RemoteComponent, setRemoteComponent] = useState<React.ComponentType<{
    title: string;
  }> | null>(null);
  const [CartComponent, setCartComponent] =
    useState<React.ComponentType<any> | null>(null);
  const [CheckoutComponent, setCheckoutComponent] =
    useState<React.ComponentType<any> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const store = useEcommerceStore();

  useEffect(() => {
    const loadRemoteComponents = async () => {
      try {
        // Dynamically import the product remote module
        const productModule = await import("product_remote/ProductList");
        const ProductComponent = productModule.default || productModule;
        setRemoteComponent(() => ProductComponent);

        // Dynamically import the cart remote module
        const cartModule = await import("cart_remote/Cart");
        const CartComp = cartModule.default || cartModule;
        setCartComponent(() => CartComp);

        // Dynamically import the checkout remote module
        const checkoutModule = await import("checkout_remote/Checkout");
        const CheckoutComp = checkoutModule.default || checkoutModule;
        setCheckoutComponent(() => CheckoutComp);

        setLoading(false);
      } catch (e) {
        console.error("Error loading remote:", e);
        setError((e as Error).message);
        setLoading(false);
      }
    };

    loadRemoteComponents();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
        <p className="ml-4 text-lg">Loading Product Remote...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <div className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Error: {error}</span>
        </div>
      </div>
    );
  }

  const isCartActive = store?.activePanel === "cart";
  const isCheckoutActive = store?.activePanel === "checkout";

  return (
    <main className="min-h-screen bg-base-200">
      <div className="grid grid-cols-3 gap-6 p-6">
        <div className="col-span-2">
          {RemoteComponent && <RemoteComponent title="All Products" />}
        </div>
        <div className="flex flex-col gap-6">
          {CartComponent && <CartComponent isActive={isCartActive} />}
          {CheckoutComponent && <CheckoutComponent isActive={isCheckoutActive} />}
        </div>
      </div>
    </main>
  );
};

// Main App with Provider
const App: React.FC = () => {
  return (
    <EcommerceProvider>
      <AppContent />
    </EcommerceProvider>
  );
};

export default App;
