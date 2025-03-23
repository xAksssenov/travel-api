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

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newTour, setNewTour] = useState({
    name: "",
    destination_id: "",
    description: "",
    price: "",
    duration: "",
  });

  const fetchCard = async () => {
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

  const handleAddTour = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/travels/", newTour, {
        withCredentials: true,
      });
      setIsModalOpen(false);
      fetchCard();
    } catch (error) {
      console.error("Ошибка добавления тура: ", error);
    }
  };

  useEffect(() => {
    fetchCard();
  }, [searchParams]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev.toString());
      newParams.set("search", searchQuery);
      return newParams;
    });
  };

  const handleSort = (order: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev.toString());
      newParams.set("orderBy", order);
      return newParams;
    });
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
            onClick={() => handleSort("price")}
          >
            Сортировать по возрастанию цены
          </button>
          <button
            className={styles.travels__button}
            onClick={() => handleSort("-price")}
          >
            Сортировать по убыванию цены
          </button>
          <button
            className={styles.travels__button}
            onClick={() => setIsModalOpen(true)}
          >
            Добавить тур
          </button>
        </div>

        {isModalOpen && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h2>Добавить тур</h2>

              <label className={styles.search__label}>
                Название тура
                <input
                  type="text"
                  placeholder="Название"
                  className={styles.search__input}
                  value={newTour.name}
                  onChange={(e) =>
                    setNewTour({ ...newTour, name: e.target.value })
                  }
                />
              </label>

              <label className={styles.search__label}>
                Номер страны
                <input
                  type="number"
                  placeholder="Номер страны"
                  className={styles.search__input}
                  value={newTour.destination_id}
                  onChange={(e) =>
                    setNewTour({ ...newTour, destination_id: e.target.value })
                  }
                />
              </label>

              <label className={styles.search__label}>
                Описание
                <textarea
                  placeholder="Описание"
                  className={styles.search__textarea}
                  value={newTour.description}
                  onChange={(e) =>
                    setNewTour({ ...newTour, description: e.target.value })
                  }
                />
              </label>

              <label className={styles.search__label}>
                Цена
                <input
                  type="number"
                  placeholder="Цена"
                  className={styles.search__input}
                  value={newTour.price}
                  onChange={(e) =>
                    setNewTour({ ...newTour, price: e.target.value })
                  }
                />
              </label>

              <label className={styles.search__label}>
                Длительность (дни)
                <input
                  type="number"
                  placeholder="Длительность"
                  className={styles.search__input}
                  value={newTour.duration}
                  onChange={(e) =>
                    setNewTour({ ...newTour, duration: e.target.value })
                  }
                />
              </label>

              <button
                className={styles.travels__button}
                onClick={handleAddTour}
              >
                Добавить
              </button>
              <button
                className={styles.travels__button}
                onClick={() => setIsModalOpen(false)}
              >
                Отмена
              </button>
            </div>
          </div>
        )}

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
