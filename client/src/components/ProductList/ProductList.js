import React, { useEffect } from "react";
import ProductItem from "../ProductItem/ProductItem";
import styles from "./ProductList.module.css";
import { axios } from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product data: ", error);
      });
  }, []);
  return (
    <main className={styles.productList}>
      {products.map((product) => (
        <ProductItem
          key={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
          product={product}
        />
      ))}
    </main>
  );
};

export default ProductList;
