import React, { useState } from "react";
import { Product } from "./types";
import { products } from "./data/products";
import ProductSearch from "./components/ProductSearch";
import ProductCard from "./components/ProductCard";
import { useCart } from "@repo/shared-store";

interface ProductListProps {
  title?: string;
  onAddToCart?: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ onAddToCart }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart: storeAddToCart } = useCart();

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (product: Product) => {
    // Use prop callback if provided, otherwise use store, otherwise alert
    if (onAddToCart) {
      onAddToCart(product);
    } else if (storeAddToCart) {
      storeAddToCart(product);
    } else {
      // Standalone fallback
      alert(`Added ${product.name} to cart!`);
    }
  };

  return (
    <div className="card bg-base-100 shadow-sm flex flex-col h-full overflow-hidden">
      <ProductSearch
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        resultsCount={filteredProducts.length}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 p-6 pt-2 overflow-y-auto">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
