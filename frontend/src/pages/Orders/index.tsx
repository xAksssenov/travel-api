import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { Order } from "../../types/orderType";
import axios from "axios";
import Header from "../../components/Header";

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const [isLoading, isSetLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/orders/`, {
        withCredentials: true,
        headers: {
          "Content-type": "application/json",
        },
      });

      if (response.status === 200) {
        setOrders(response.data.results);
        isSetLoading(true);
      }
    } catch (error) {
      console.log("Ошибка получения карточек: ", error);
      isSetLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <Header />

      <section className={styles.orders}>
        <h2 className={styles.orders__title}>Заказы</h2>
        {isLoading ? (
          <div className={styles.orders__list}>
            {orders.map((order) => (
              <div key={order.id} className={styles.order}>
                <p className={styles.order__id}>Заказ №{order.id}</p>
                <p className={styles.order__info}>
                  <strong>Адрес:</strong> {order.profile.address}
                </p>
                <p className={styles.order__info}>
                  <strong>Телефон:</strong> {order.profile.phone_number}
                </p>
                <p className={styles.order__info}>
                  <strong>Дата заказа:</strong>
                  {new Date(order.order_date).toLocaleDateString()}
                </p>
                <p className={styles.order__info}>
                  <strong>Дата поездки:</strong>
                  {new Date(order.travel_date).toLocaleDateString()}
                </p>
                <p className={styles.order__info}>
                  <strong>Количество человек:</strong> {order.num_people}
                </p>
                <p className={styles.order__info}>
                  <strong>Пакет тура:</strong> {order.package}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <h3 className={styles.orders__loading}>Загрузка заказов...</h3>
        )}
      </section>
    </div>
  );
};

export default Orders;
