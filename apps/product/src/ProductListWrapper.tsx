import React from "react";
import ProductList from "./ProductList";

interface ProductListWrapperProps {
  title?: string;
}

const ProductListWrapper: React.FC<ProductListWrapperProps> = ({
  title = "Featured Products",
}) => {
  return <ProductList title={title} />;
};

export default ProductListWrapper;
