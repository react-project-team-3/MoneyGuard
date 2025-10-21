import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';
import HomeIcon from '../../assets/icons/home.svg?react';
import StatisticsIcon from '../../assets/icons/statistics.svg?react';

const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <NavLink
        to="/dashboard/home"
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
      >
        <HomeIcon className={styles.icon} />
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/dashboard/statistics"
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
      >
        <StatisticsIcon className={styles.icon} />
        <span>Statistics</span>
      </NavLink>
    </nav>
  );
};

export default Navigation;