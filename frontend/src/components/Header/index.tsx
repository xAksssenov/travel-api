import { Link } from "react-router";
import styles from "./index.module.scss";
import { useState } from "react";

const Header = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className={styles.header}>
      <div className={styles.header__container}>
        <Link to="/" className={styles.header__title}>
          TravelEleven
        </Link>

        <div className={styles.header__nav}>
          <Link to="/catalog-female" className={styles.header__button}>
            Женщинам
          </Link>
          <Link to="/catalog-male" className={styles.header__button}>
            Мужчинам
          </Link>
          <Link to="/new" className={styles.header__button}>
            Новинки
          </Link>
          <Link to="/about" className={styles.header__button}>
            О нас
          </Link>
        </div>

        <div className={styles.header__icons}>
          <Link to="/favourites">Favourites</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/cart">Cart</Link>
        </div>

        <div className={styles.header__burger} onClick={togglePopup}>
          <span className={styles.burger__line} />
          <span className={styles.burger__line} />
          <span className={styles.burger__line} />
        </div>
      </div>

      {isPopupOpen && (
        <div className={styles.popup} onClick={togglePopup}>
          <div className={styles.popup__content}>
            <nav className={styles.popup__nav}>
              <Link to="/" className={styles.header__button}>
                Женщинам
              </Link>
              <Link to="/" className={styles.header__button}>
                Мужчинам
              </Link>
              <Link to="/new" className={styles.header__button}>
                Новинки
              </Link>
              <Link to="/about" className={styles.header__button}>
                О нас
              </Link>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
