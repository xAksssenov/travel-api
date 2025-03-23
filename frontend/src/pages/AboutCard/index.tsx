import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { Card, Dop } from "../../types/cardType";
import { Review } from "../../types/reviewType";
import Header from "../../components/Header";

const AboutCard = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [card, setCard] = useState<Card | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [dop, setDop] = useState<Dop[]>([]);
  const [openSection, setOpenSection] = useState<string[]>([]);

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [updatedCard, setUpdatedCard] = useState<Card | null>(null);

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
        setUpdatedCard(response.data);
      }
    } catch (error) {
      console.error("Ошибка получения карточки: ", error);
    }
  };

  const fetchReviews = async (packageId: string) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/reviews/`, {
        withCredentials: true,
        headers: {
          "Content-type": "application/json",
        },
        params: {
          package: packageId,
        },
      });

      if (response.status === 200) {
        setReviews(response.data.results);
        console.log(response.data);
      }
    } catch (error) {
      console.error("Ошибка получения отзывов: ", error);
    }
  };

  const handleEdit = async () => {
    try {
      const updatedData = {
        ...updatedCard,
        destination_id: updatedCard?.destination?.id,
      };

      await axios.put(`http://127.0.0.1:8000/api/travels/${id}/`, updatedData, {
        withCredentials: true,
      });
      setIsEditMode(false);
      fetchCard(id!);
    } catch (error) {
      console.error("Ошибка редактирования тура: ", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/travels/${id}/`, {
        withCredentials: true,
      });
      navigate("/");
    } catch (error) {
      console.error("Ошибка удаления тура: ", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchCard(id);
      fetchReviews(id);
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
              src={card.destination.image}
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
              <div className={styles.buttons__section}>
                <button
                  className={styles.buttons__cart}
                  onClick={() => setIsEditMode(true)}
                >
                  Редактировать
                </button>
                <button
                  className={styles.buttons__delete}
                  onClick={handleDelete}
                >
                  Удалить
                </button>
              </div>
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
                    {reviews.length > 0 ? (
                      reviews.map((review) => (
                        <div
                          key={review.id}
                          className={styles.additional__review}
                        >
                          <p>
                            <strong>Номер телефона:</strong>
                            {review.profile.phone_number}
                          </p>
                          <p>
                            <strong>Рейтинг:</strong> {review.rating}
                          </p>
                          <p>
                            <strong>Комментарий:</strong> {review.comment}
                          </p>
                          <p>
                            <strong>Дата добавления:</strong>{" "}
                            {new Date(review.date_posted).toLocaleString()}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p>Отзывы пока отсутствуют.</p>
                    )}
                  </div>
                )}
              </div>

              <div>
                <button
                  className={`${styles.additional__title} ${
                    openSection.includes("dop") ? styles.open : ""
                  }`}
                  onClick={() => toggleSection("dop")}
                >
                  Дополнительные услуги
                  <span className={styles.arrow} />
                </button>
                {openSection.includes("dop") && (
                  <div className={styles.additional__content}>
                    {card.extra_services.length > 0 ? (
                      card.extra_services.map((service) => (
                        <div
                          key={service.id}
                          className={styles.additional__review}
                        >
                          <p>
                            <strong>Услуга:</strong> {service.name}
                          </p>
                          <p>
                            <strong>Описание:</strong> {service.description}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p>Дополнительные услуги отсутствуют.</p>
                    )}
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
                  Страна:
                  <span className={styles.arrow} />
                </button>
                {openSection.includes("delivery") && (
                  <div className={styles.additional__content}>
                    <p>
                      {card.destination.country.name} -{" "}
                      <a target="_blank" href={card.destination.country.url}>
                        Ссылка на информацию о стране
                      </a>
                    </p>
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
                  Описание города:
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

      {isEditMode && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Редактировать тур</h2>
            <label className={styles.search__label}>
              Название
              <input
                type="text"
                placeholder="Название"
                className={styles.search__input}
                value={updatedCard?.name || ""}
                onChange={(e) =>
                  setUpdatedCard((prev) => ({ ...prev!, name: e.target.value }))
                }
              />
            </label>

            <label className={styles.search__label}>
              Цена
              <input
                type="number"
                placeholder="Цена"
                className={styles.search__input}
                value={updatedCard?.price || ""}
                onChange={(e) =>
                  setUpdatedCard((prev) => ({
                    ...prev!,
                    price: String(e.target.value),
                  }))
                }
              />
            </label>

            <label className={styles.search__label}>
              Описание
              <textarea
                placeholder="Описание"
                className={styles.search__textarea}
                value={updatedCard?.description || ""}
                onChange={(e) =>
                  setUpdatedCard((prev) => ({
                    ...prev!,
                    description: e.target.value,
                  }))
                }
              />
            </label>

            <button className={styles.buttons__cart} onClick={handleEdit}>
              Сохранить
            </button>
            <button
              className={styles.buttons__cart}
              onClick={() => setIsEditMode(false)}
            >
              Отмена
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutCard;
