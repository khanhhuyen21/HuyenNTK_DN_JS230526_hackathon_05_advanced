import React, { useEffect, useState } from "react";
import styles from "./Footer.module.css";
import axios from "axios";
import { MainContext, useContext } from "../../context/context";

const Footer = () => {
  const { clearBasket, basket } = useContext(MainContext);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const serverUrl = "http://localhost:4000/api/v1/products";

    axios
      .get(serverUrl)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product data: ", error);
      });
  }, []);
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        {basket.length > 0 && (
          <button onClick={clearBasket} className={styles.clear}>
            Clear Basket{" "}
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              clipRule="evenodd"
            >
              <path d="M19 24h-14c-1.104 0-2-.896-2-2v-16h18v16c0 1.104-.896 2-2 2zm-7-10.414l3.293-3.293 1.414 1.414-3.293 3.293 3.293 3.293-1.414 1.414-3.293-3.293-3.293 3.293-1.414-1.414 3.293-3.293-3.293-3.293 1.414-1.414 3.293 3.293zm10-8.586h-20v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2zm-8-3h-4v1h4v-1z" />
            </svg>
          </button>
        )}

        {basket.length > 0 && (
          <div className={styles.bill}>
            <ul>
              <li>
                <span>Name</span>
                <span>Amount</span>
                <span>Price</span>
              </li>
              {basket.map((item) => {
                const product = products.find((i) => i.id === item.id);
                total += item.amount * product.price;
                return (
                  <li key={item.id}>
                    <span>{product.name}</span>
                    <span>x{item.amount}</span>
                    <span>{item.amount * product.price}$</span>
                  </li>
                );
              })}
              <li>
                <span></span>
                <span></span>
                <span>Total: {total}$</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
