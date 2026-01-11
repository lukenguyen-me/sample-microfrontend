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
    <section className="product-container">
      <h2>{title}</h2>
      <div className="grid">
        {products.map((product) => (
          <div key={product.id} className="card">
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button onClick={handleAddToCart}>Add to Cart</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductList;
