import { NavLink } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { IoStatsChartOutline } from 'react-icons/io5';
import styles from './Navigation.module.css';

const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <NavLink
        to="/dashboard/home"
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
      >
        <AiOutlineHome size={24} />
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/dashboard/statistics"
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
      >
        <IoStatsChartOutline size={24} />
        <span>Statistics</span>
      </NavLink>
    </nav>
  );
};

export default Navigation;