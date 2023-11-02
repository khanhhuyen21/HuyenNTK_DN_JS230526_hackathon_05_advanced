import React, { useState, useEffect } from "react";
import axios from "axios";
import { MainContext } from "./context/context";
import Header from "./components/Header/Header";
import styles from "./App.module.css";
import ProductList from "./components/ProductList/ProductList";
import Footer from "./components/Footer/Footer";

function App() {
  const [money, setMoney] = useState(265000000000);
  const [basket, setBasket] = useState([]);
  const [total, setTotal] = useState(0);

  const clearBasket = () => {
    setBasket([]);
    setTotal(0);
  };

  const data = {
    money,
    setMoney,
    basket,
    setBasket,
    total,
    clearBasket,
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/products")
      .then((response) => {
        const products = response.data;
        setTotal(
          basket.reduce((acc, item) => {
            const product = products.find((p) => p.id === item.id);
            return acc + item.amount * product.price;
          }, 0)
        );
      })
      .catch((error) => {
        console.error("Error fetching product data: ", error);
      });
  }, [basket]);

  return (
    <MainContext.Provider value={data}>
      <section className={styles.mainsection}>
        <Header />
        <ProductList />
        <Footer />
      </section>
    </MainContext.Provider>
  );
}

export default App;
