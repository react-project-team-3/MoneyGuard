import styles from './Navigation.module.css';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li>
          <NavLink to="/dashboard/home">Home</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/statistics">Statistics</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/currency">Currency</NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default Navigation;
