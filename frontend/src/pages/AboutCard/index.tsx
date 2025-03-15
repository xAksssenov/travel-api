import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { Card } from "../../types/cardType";

const AboutCard = () => {
  const { id } = useParams<{ id: string }>();

  const [card, setCard] = useState<Card | null>(null);
  const [openSection, setOpenSection] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const fetchCard = async (id: string) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8080/card/${id}`, {
        withCredentials: true,
        headers: {
          "Content-type": "application/json",
        },
      });

      if (response.status === 200) {
        setCard(response.data);
        setSelectedImage(response.data.image);
      }
    } catch (error) {
      console.error("Ошибка получения карточки: ", error);
    }
  };

  const toggleSection = (section: string) => {
    setOpenSection((prev: string[]) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };
  return (
    <div>
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
                    openSection.includes("description") ? styles.open : ""
                  }`}
                  onClick={() => toggleSection("description")}
                >
                  Описание и состав:
                  <span className={styles.arrow} />
                </button>
                {openSection.includes("description") && (
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
                  Доставка:
                  <span className={styles.arrow} />
                </button>
                {openSection.includes("delivery") && (
                  <ul className={styles.additional__content}>
                    <li>
                      При заказе на сумму от 20 000 руб. — доставка по России
                      бесплатно.
                    </li>
                    <li>Курьер по Москве и МО за пределы МКАД — 500 руб.</li>
                    <li>Курьер по Санкт-Петербургу — 500 руб.</li>
                    <li>Курьер при доставке в регионы — 790 руб.</li>
                    <li>Доставка в пункты выдачи — от 290 руб.</li>
                    <li>СНГ — от 890 руб.</li>
                  </ul>
                )}
              </div>

              <div>
                <button
                  className={`${styles.additional__title} ${
                    openSection.includes("return") ? styles.open : ""
                  }`}
                  onClick={() => toggleSection("return")}
                >
                  Возврат:
                  <span className={styles.arrow} />
                </button>
                {openSection.includes("return") && (
                  <div className={styles.additional__content}>
                    <p>
                      Если товар вам не подошел, вы можете оформить возврат в
                      течение 14 дней с момента получения заказа.
                    </p>
                  </div>
                )}
              </div>

              <div>
                <button
                  className={`${styles.additional__title} ${
                    openSection.includes("care") ? styles.open : ""
                  }`}
                  onClick={() => toggleSection("care")}
                >
                  Уход за изделием:
                  <span className={styles.arrow} />
                </button>
                {openSection.includes("care") && (
                  <ol className={styles.additional__content}>
                    <li>
                      Ручная стирка при температуре не выше 30℃. Не выкручивать.
                    </li>
                    <li>Не отбеливать.</li>
                    <li>Утюжить при температуре не выше 115℃.</li>
                    <li>Сушить вертикально.</li>
                    <li>Деликатная химчистка.</li>
                  </ol>
                )}
              </div>

              <div>
                <button
                  className={`${styles.additional__title} ${
                    openSection.includes("count") ? styles.open : ""
                  }`}
                  onClick={() => toggleSection("count")}
                >
                  В наличие:
                  <span className={styles.arrow} />
                </button>
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
