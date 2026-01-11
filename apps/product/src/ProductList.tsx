import React from "react";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface ProductListProps {
  title?: string;
}

const ProductList: React.FC<ProductListProps> = ({
  title = "Featured Products",
}) => {
  const products: Product[] = [
    { id: 1, name: "Mechanical Keyboard", price: 150 },
    { id: 2, name: "Gaming Mouse", price: 80 },
    { id: 3, name: "Ultrawide Monitor", price: 450 },
  ];

  const handleAddToCart = () => {
    alert("Added to cart!");
  };

  return (
    <section className="container mx-auto p-8">
      <h2 className="text-3xl font-bold">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="card-title">{product.name}</h3>
              <p className="text-2xl font-semibold text-primary">
                ${product.price}
              </p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary" onClick={handleAddToCart}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductList;
