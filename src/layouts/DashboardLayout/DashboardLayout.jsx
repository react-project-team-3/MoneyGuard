import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Navigation from '../../components/Navigation/Navigation';
import Balance from '../../components/Balance/Balance';
import Currency from '../../components/Currency/Currency';
import styles from './DashboardLayout.module.css';

const DashboardLayout = () => {
  return (
    <div className={styles.container}>
      <Header />
      
      <div className={styles.mainContent}>
        <aside className={styles.sidebar}>
          <Navigation />
          <Balance />
          <div className={styles.currencyDesktop}>
            <Currency />
          </div>
        </aside>

        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;