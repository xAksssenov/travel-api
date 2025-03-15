import { Link } from "react-router";
import { Card } from "../../types/cardType";
import styles from "./index.module.scss";

const ProductCard = (props: Card) => {
  return (
    <Link to={`/card/${props.id}`} key={props.id} className={styles.card}>
      <img
        className={styles.card__img}
        src={props.image}
        alt={`photo_${props.id}`}
      />
      <p className={styles.card__title}>{props.title}</p>
      {props.sale ? (
        <div className={styles.card__section}>
          <p className={styles.card__sale}>{props.price + props.sale} ₽</p>
          <p className={styles.card__new}>{props.price} ₽</p>
        </div>
      ) : (
        <p className={styles.card__price}>{props.price} ₽</p>
      )}
    </Link>
  );
};

export default ProductCard;
