import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import ProductCard from "../../components/ProductCard";
import { Card } from "../../types/cardType";
import axios from "axios";
import Header from "../../components/Header";

const Home = () => {
  const [limitSale, setLimitSale] = useState<number>(8);
  const [limitPopular, setLimitPopular] = useState<number>(8);

  const [cardSales, setCardSales] = useState<Card[]>([]);
  const [cardPopulars, setCardPopulars] = useState<Card[]>([]);

  const [isLoadingSale, isSetLoadingSale] = useState(false);
  const [isLoadingPopular, isSetLoadingPopular] = useState(false);

  const fetchCardSales = async (limitSale: number) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8080/card/sale?skip=0&limit=${limitSale}`,
        {
          withCredentials: true,
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setCardSales(response.data);
        isSetLoadingSale(true);
      }
    } catch (error) {
      console.log("Ошибка получения карточек: ", error);
      isSetLoadingSale(false);
    }
  };

  const fetchCardPopulars = async (limitPopular: number) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8080/card/popular?skip=0&limit=${limitPopular}`,
        {
          withCredentials: true,
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setCardPopulars(response.data);
        isSetLoadingPopular(true);
      }
    } catch (error) {
      console.log("Ошибка получения карточек: ", error);
      isSetLoadingPopular(false);
    }
  };

  useEffect(() => {
    fetchCardSales(limitSale);
  }, [limitSale]);

  useEffect(() => {
    fetchCardPopulars(limitPopular);
  }, [limitPopular]);

  return (
    <div>
      <Header />

      <section className={styles.sales}>
        <h2 className={styles.sales__title}>Скидки</h2>
        {isLoadingSale ? (
          <div className={styles.cards}>
            {cardSales.map((item) => (
              <div key={item.id}>
                <ProductCard {...item} />
              </div>
            ))}
          </div>
        ) : (
          <h3 className={styles.sales__title}>
            Загрузка товаров со скидками...
          </h3>
        )}
        <button
          onClick={() => {
            setLimitSale((prevLimit) => prevLimit + 8);
          }}
          className={styles.sales__button}
        >
          Просмотреть еще
        </button>
      </section>

      <section className={styles.popular}>
        <h2 className={styles.popular__title}>Популярные товары</h2>
        {isLoadingPopular ? (
          <div className={styles.cards}>
            {cardPopulars.map((item) => (
              <div key={item.id}>
                <ProductCard {...item} />
              </div>
            ))}
          </div>
        ) : (
          <h3 className={styles.sales__title}>
            Загрузка популярных товаров...
          </h3>
        )}
        <button
          onClick={() => {
            setLimitPopular((prevLimit) => prevLimit + 8);
          }}
          className={styles.sales__button}
        >
          Просмотреть еще
        </button>
      </section>
    </div>
  );
};

export default Home;
