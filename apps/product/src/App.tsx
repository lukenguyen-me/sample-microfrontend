import React from "react";
import ProductList from "./ProductList";

const App: React.FC = () => {
  return (
    <main>
      <h1>Product Remote (Standalone Dev Mode)</h1>
      <ProductList title="Previewing Catalog" />
    </main>
  );
};

export default App;
