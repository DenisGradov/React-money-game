import styles from "./navigation.module.css";
import { NavLink } from "react-router-dom";
function Navigation() {
  return (
    <nav className={styles.nav}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${isActive ? styles.active : styles.navlink}`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/shop"
        className={({ isActive }) =>
          `${isActive ? styles.active : styles.navlink}`
        }
      >
        Shop
      </NavLink>
    </nav>
  );
}

export default Navigation;
