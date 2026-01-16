import { formatCurrency } from "@repo/shared-utils";
import type React from "react";
import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="card  bg-base-100 shadow-sm hover:shadow-md transition-shadow duration-200">
      <figure className="relative overflow-hidden">
        <div
          className="w-full aspect-square bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: `url("${product.image}")` }}
        >
          <div className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-colors duration-200"></div>
        </div>
      </figure>
      <div className="card-body">
        <div className="flex justify-between items-start gap-2">
          <h2 className="card-title text-base font-medium leading-normal">
            {product.name}
          </h2>
          <p className="text-base font-bold leading-normal whitespace-nowrap">
            ${formatCurrency(product.price)}
          </p>
        </div>
        <p className="text-base-content/60 text-sm font-normal leading-normal line-clamp-1">
          {product.description}
        </p>
        <div className="card-actions justify-end mt-2">
          <button
            type="button"
            className="btn btn-soft w-full btn-sm"
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
