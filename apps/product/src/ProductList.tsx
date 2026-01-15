import React from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

interface ProductListProps {
  title?: string;
}

const ProductList: React.FC<ProductListProps> = () => {
  const products: Product[] = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 120.0,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAATq5pmS1ZM2zWJ4c4bTazN-G7ys-fNLGTRW5QsUurVowaRc4-vgzI3EyWLcTWMktZr0csZh6qSMUMyGWD5EVM6wk6g3zhVf_cnkE6vrw4KyxlSyl2xtqBvAL8bBj5VQ0gI6r6c-fe3lLFL943VnMNP2IoWNZ-BIMe50x2LB17dFH75Hem_KYdIo0BiA5oanVi9uQ0z1N8BH3tfGPYlUVbx6SOe0lO3qtiJZJNFuPd0jnoEF4-jmbZhT_xW8i4yMVmzOYeeZDIj1NA",
      description: "Noise cancelling, 20h battery",
    },
    {
      id: 2,
      name: "Mechanical Keyboard",
      price: 150.0,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAXReQ6SRc-qZqJU3jNLHSh1VGbJzJ01iTPPeAXxO6DEcXLf4EcA5rqApJ_4riJlN5m3xm2mTMtXS4AX25ofTocUrcXN-znHvxh-U4ZmAhmPAkZvBisnipwwnRnWgq5QNK_OMhn1FqrILG3hst7nqqhzLEiLxbKu8xR4635ATtmpsSENJrEMl8_Ku4Tzb1CICzT02smTTD6YMKGTSCdzXtcPkzkk6LZ9ZZpnP_9uR-5TRQRgKLfVkMgZh2-dOE_RZfOovtlzqHkbmXV",
      description: "RGB Backlit, Blue Switches",
    },
    {
      id: 3,
      name: "Ergonomic Mouse",
      price: 60.0,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCndYQZT6rDfQhGkCUg_nnnrDJ3fHXD1nDBYK7ZV4T3waUZeUPW9ydDXeFmSyQdM-j5Om-zWT_tiGwb4M70QWAkw4kvT15jAXn9r8ZpqIj1sU43D-LAlNy0xX-bOmnMH0wqdcuEsq8cAmiZyu65pMWq7InCrdaLyeXDCqWt7RghtfhjfTjO_NjxOTkYVCZXtiApwZw2sWZYSiC_9U-4_sUp8aDohWl-xAlW8tD9UIIWzikM6R258wayiRbwfRXArS3N9RwvIc2AcpfP",
      description: "Vertical design, wireless",
    },
    {
      id: 4,
      name: "4K Monitor",
      price: 300.0,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBjJ3kY9Us0fnE1auPNAyq8Dvn-RDs5eeZdzT9_Gu2rXoC1yINJQsh3NZXqxYOXV9pgVc16YO3aoQhw10ktu8W9pqv2jRMBVDl4jmfLtzSyWgFZdMVd1bQfD_qtu4_QsoS3uQKpqYRnEW4ccEdeWdQFJ8WwOxHQp9wzdYN0UwSa8OTgtN3LUWrb_D4Vq-rGoPIV1z3Xl25J3WamUPvIFL9DNHjE-Xoam15YrwSCl61w0uU3up7TcW5kdn_LtJmD_NlXTKQibW3Tx3Xw",
      description: "27-inch, IPS Panel, 144Hz",
    },
    {
      id: 5,
      name: "Smart Watch",
      price: 199.0,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBy-ZDl-Nj40cq3Lc3aqqOIRMxE98ZTuF7-y7BvLz3r6D0NOqEjDmne64_3G8iUksGMzwRz9mgGzqeoyips2TGptFO84DRvWDmzxwFzsH0acJlqi5ygy5zid8gHoyRj_dl0-5xUwbG7164lIpjRoDHQlBNCiMLVWLO8Ec5aWsYbQM-8W4-nYsl2T5P8dZv5R3e6qjtSHA-FOcqi718s5FYBhHyF3W77K9cvOupxqnn9r3qwywR8SJRD0N40BIXYrB83nG0ljYYgG4z_",
      description: "Fitness tracking, GPS",
    },
  ];

  const handleAddToCart = () => {
    alert("Added to cart!");
  };

  return (
    <section className="container mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6">Products</h2>
      <div className="flex flex-wrap gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="card bg-base-100 shadow w-80 hover:shadow-lg transition-shadow duration-300"
          >
            <figure>
              <img
                src={product.image}
                alt={product.name}
                className="w-full aspect-square"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{product.name}</h2>
              <p className="text-base-content/70">{product.description}</p>
              <div className="card-actions justify-end items-center mt-4 gap-4">
                <button
                  className="btn btn-primary flex-1"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
                <strong className="text-xl font-bold text-primary ">
                  ${product.price.toFixed(2)}
                </strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductList;
