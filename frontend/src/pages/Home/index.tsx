import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import ProductCard from "../../components/ProductCard";
import { Card } from "../../types/cardType";
import axios from "axios";
import Header from "../../components/Header";

const Home = () => {
  const [cardSales, setCardSales] = useState<Card[]>([]);

  const [isLoadingSale, isSetLoadingSale] = useState(false);

  const fetchCardSales = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/travels/`, {
        withCredentials: true,
        headers: {
          "Content-type": "application/json",
        },
      });

      if (response.status === 200) {
        setCardSales(response.data.results);
        isSetLoadingSale(true);
      }
    } catch (error) {
      console.log("Ошибка получения карточек: ", error);
      isSetLoadingSale(false);
    }
  };

  useEffect(() => {
    fetchCardSales();
  }, []);

  return (
    <div>
      <Header />

      <section className={styles.sales}>
        <h2 className={styles.sales__title}>Туры</h2>
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
            Загрузка туров...
          </h3>
        )}
      </section>
    </div>
  );
};

export default Home;
