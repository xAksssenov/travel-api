import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { useParams } from "react-router";
import axios from "axios";
import { Card } from "../../types/cardType";
import Header from "../../components/Header";

const AboutCard = () => {
  const { id } = useParams<{ id: string }>();

  const [card, setCard] = useState<Card | null>(null);
  const [openSection, setOpenSection] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const fetchCard = async (id: string) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/travels/${id}`,
        {
          withCredentials: true,
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setCard(response.data);
        setSelectedImage(response.data.image);
      }
    } catch (error) {
      console.error("Ошибка получения карточки: ", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchCard(id);
    }
  }, [id]);

  const toggleSection = (section: string) => {
    setOpenSection((prev: string[]) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };
  return (
    <div>
      <Header />

      {card ? (
        <div className={styles.product}>
          <div className={styles.gallery}>
            <div className={styles.gallery__thumbnails}>
              <img />
            </div>
            <img
              className={styles.gallery__img}
              src={selectedImage}
              alt={card.name}
            />
          </div>

          <div className={styles.details}>
            <div className={styles.details__section}>
              <h1 className={styles.details__title}>{card.name}</h1>
              <p className={styles.details__price}>{card.price} ₽</p>
            </div>

            <p className={styles.details__description}>{card.description}</p>

            <div className={styles.buttons}>
              <button className={styles.buttons__cart}>
                Добавить в корзину
              </button>
            </div>

            <div className={styles.additional}>
              <div>
                <button
                  className={`${styles.additional__title} ${
                    openSection.includes("reviews") ? styles.open : ""
                  }`}
                  onClick={() => toggleSection("reviews")}
                >
                  Отзывы
                  <span className={styles.arrow} />
                </button>
                {openSection.includes("reviews") && (
                  <div className={styles.additional__content}>
                    <p>
                      Этот товар изготовлен из высококачественных материалов,
                      обеспечивающих долгий срок службы. Удобен в повседневной
                      носке благодаря современному дизайну и эргономичности.
                      Легко сочетается с другими элементами гардероба. Подходит
                      для всех сезонов.
                    </p>
                  </div>
                )}
              </div>

              <div>
                <button
                  className={`${styles.additional__title} ${
                    openSection.includes("delivery") ? styles.open : ""
                  }`}
                  onClick={() => toggleSection("delivery")}
                >
                  Направление:
                  <span className={styles.arrow} />
                </button>
                {openSection.includes("delivery") && (
                  <div className={styles.additional__content}>
                    <p>{card.destination.country.name}</p>
                  </div>
                )}
              </div>

              <div>
                <button
                  className={`${styles.additional__title} ${
                    openSection.includes("return") ? styles.open : ""
                  }`}
                  onClick={() => toggleSection("return")}
                >
                  Описание направления:
                  <span className={styles.arrow} />
                </button>
                {openSection.includes("return") && (
                  <div className={styles.additional__content}>
                    <p>{card.destination.description}</p>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      ) : (
        <h3 className={styles.loading}>Загрузка страницы...</h3>
      )}
    </div>
  );
};

export default AboutCard;
