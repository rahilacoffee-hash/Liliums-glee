import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

import productsData from "./collectionData";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const { data } = await axiosInstance.get("/products/featured");

      setProducts(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>

      <h2>
        {productsData.title}{" "}
        <span>{productsData.highlight}</span>
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid">
          {products.map((product) => (
            <div key={product._id}>

              <img
                src={product.image}
                alt={product.name}
              />

              <h3>{product.name}</h3>

              <p>{product.category}</p>

              <p>{product.description}</p>

              <h4>
                ₦{product.price.toLocaleString()}
              </h4>

            </div>
          ))}
        </div>
      )}

    </section>
  );
}

export default FeaturedProducts;