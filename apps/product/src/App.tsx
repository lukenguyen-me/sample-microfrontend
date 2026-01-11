import React from "react";
import ProductList from "./ProductList";

const App: React.FC = () => {
  return (
    <main>
      <div className="fixed top-0 w-full text-center bg-neutral p-2">
        <h1 className="font-semibold text-neutral-content">
          Product Remote (Standalone Dev Mode)
        </h1>
      </div>
      <ProductList title="Previewing Catalog" />
    </main>
  );
};

export default App;
