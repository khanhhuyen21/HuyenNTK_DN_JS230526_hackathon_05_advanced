import React from "react";
import AnimatedNumber from "animated-number-react";
import { MainContext, useContext } from "../../context/context";
import styles from "./Header.module.css";

const Header = () => {
  const { money, total } = useContext(MainContext);

  return (
    <header className={styles.header}>
      <div className={styles.stickyHeader}>
        <h2 className={styles.text}>
          <span className={styles.moneyCount}>
            {money - total === 0 ? (
              "Not even Elon Musk can do that."
            ) : (
              <AnimatedNumber
                value={total > 0 ? money - total : money}
                formatValue={(money) => money.toFixed(2)}
                duration={200}
              />
            )}
            $
          </span>
        </h2>
      </div>
    </header>
  );
};

export default Header;
