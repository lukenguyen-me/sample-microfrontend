import type React from "react";
import ProductList from "./ProductList";

const App: React.FC = () => {
  return (
    <main className="min-h-screen bg-base-200">
      <div className="fixed top-0 w-full text-center bg-neutral/80 p-2 z-10">
        <h1 className="font-semibold text-neutral-content">
          Product Remote (Standalone Dev Mode)
        </h1>
      </div>
      <div className="container mx-auto max-w-screen-2xl p-6 pt-16">
        <ProductList />
      </div>
    </main>
  );
};

export default App;
