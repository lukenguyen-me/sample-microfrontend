import { EcommerceProvider } from "@repo/shared-store";
import type React from "react";
import Cart from "./Cart";

const App: React.FC = () => {
  return (
    <EcommerceProvider>
      <main className="min-h-screen bg-base-200">
        <div className="fixed top-0 w-full text-center bg-neutral/80 p-2 z-10">
          <h1 className="font-semibold text-neutral-content">
            Cart Remote (Standalone Dev Mode)
          </h1>
        </div>
        <div className="container mx-auto max-w-2xl p-6 pt-16">
          <Cart />
        </div>
      </main>
    </EcommerceProvider>
  );
};

export default App;
