import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./index.module.scss";
import ProductCard from "../../components/ProductCard";
import { Card } from "../../types/cardType";
import axios from "axios";
import Header from "../../components/Header";

const Home = () => {
  const [cardSales, setCardSales] = useState<Card[]>([]);
  const [isLoadingSale, isSetLoadingSale] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string>(
    searchParams.get("search") || ""
  );

  const fetchCardSales = async () => {
    try {
      const search = searchParams.get("search") || "";
      const orderBy = searchParams.get("orderBy") || "";

      const response = await axios.get(
        `http://127.0.0.1:8000/api/travels/?search=${search}&orderBy=${orderBy}`,
        {
          withCredentials: true,
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setCount(response.data.count);
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
  }, [searchParams]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchParams({ search: searchQuery });
  };

  return (
    <div>
      <Header />

      <section className={styles.travels}>
        <h2 className={styles.travels__title}>Туры в количестве: {count}</h2>

        <form onSubmit={handleSearch} className={styles.search}>
          <input
            type="text"
            placeholder="Поиск по названию тура"
            className={styles.search__input}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className={styles.travels__button} type="submit">
            Искать
          </button>
        </form>

        <div className={styles.travels__section}>
          <button
            className={styles.travels__button}
            onClick={() => setSearchParams({ orderBy: "price" })}
          >
            Сортировать по возрастанию цены
          </button>
          <button
            className={styles.travels__button}
            onClick={() => setSearchParams({ orderBy: "-price" })}
          >
            Сортировать по убыванию цены
          </button>
        </div>

        {isLoadingSale ? (
          <div className={styles.cards}>
            {cardSales.map((item) => (
              <div key={item.id}>
                <ProductCard {...item} />
              </div>
            ))}
          </div>
        ) : (
          <h3 className={styles.travels__title}>Загрузка туров...</h3>
        )}
      </section>
    </div>
  );
};

export default Home;
